import { useState, useEffect } from "react";
import { useToken } from "../../hooks/custom/token";
import { FaUserCircle } from "react-icons/fa";
import { Axios as axios } from "../../utils/axios";
import motor from "../../assets/motor.webp";
import Button from "../../components/button";

const User = () => {
  const { fetchUser, getToken } = useToken();
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]); // State for user's products

  // Fetch user details
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
    };
    fetchData();
  }, [fetchUser]);

  // Fetch user products
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("/product/user-products", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data.products); // Store products in state
      } catch (error) {
        console.error("Error fetching user products", error);
      }
    };
    fetchUserProducts();
  }, []);

  return (
    <div className="flex md:flex-row flex-col text-center gap-4 text-xl py-20 px-5">
      {/* User Profile Section */}
      <div className="div1 bg-white md:w-[30%] rounded-md md:h-[80vh] flex items-center flex-col py-5">
        <div className="userImage">
          <FaUserCircle color="#fea03c" size={90} />
        </div>
        <div className="userDetail">
          <h2>
            {user?.firstName || "Loading..."} {user?.lastName || "Loading..."}
          </h2>
          <p>+234 {user?.phoneNumber}</p>
          {/* Add other user details here */}
        </div>
      </div>

      {/* User Products Section */}
      <div className="div2 bg-white w-full h-[80vh] rounded-md p-2 overflow">
        <h2 className="py-5">My Adverts</h2>
        <div className="text-center">
          <Button
            text={"Add a Product"}
            color={"#fea03c"}
            link={"/profile/add-Ads"}
          />
        </div>

        {/* Render a message if no products are available */}
        {products.length === 0 ? (
          <p className="text-sm text-left my-5">No Products Available</p>
        ) : (
          <div className="my-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Product Cards */}
            {products.map((product, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 relative"
              >
                <div className="cardImage">
                  <img
                    src={product?.imageURI?.[0] || motor} // Display product image or fallback image
                    alt={product.name || "Product"}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="md:text-lg text-sm font-semibold text-gray-500">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">₦ {product.price || "Price"}</p>
                </div>

                {product.seller.plan !== "Free" && (
                  <div className="plan bg-[#dca416] absolute top-0 text-center px-2 w-[50%] text-white py-2">
                    <p className="text-sm">{product.seller.plan}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
