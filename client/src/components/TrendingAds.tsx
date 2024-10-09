import React, { useState } from "react";
import motor from "../assets/motor.webp";
import { Axios as axios } from "../utils/axios";
import { Link } from "react-router-dom";

interface ISeller {
  email: string;
  plan: string;
}

interface IProducts {
  name: string;
  imageURI: [string];
  price: string;
  seller: ISeller;
  _id: string;
}

const TrendingAds = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/product/products");
      setProducts(res.data.products);
      console.log(res.data);
    };

    fetchProducts();
  }, []);
  return (
    <div className="my-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
      {/* Card 1 */}
      {products.map((product, index) => (
        <Link to={`product/${product._id}`}>
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white relative"
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
              <div className="plan bg-[#dca416] absolute top-0 text-center px-2 w-[50%] text-white py-0.5">
                <p className="text-sm">{product.seller.plan}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TrendingAds;
