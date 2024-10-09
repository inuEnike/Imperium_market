import { useState, useEffect } from "react";
import { Axios as axios } from "../../utils/axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

interface ISeller {
  email: string;
  plan: string;
}

interface IProduct {
  name: string;
  imageURI: string[];
  price: string;
  seller: ISeller;
  _id: string;
}

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/product/${id}`);
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct?.imageURI[0]);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center p-10">
        {product ? (
          <div className="w-full flex flex-col items-center">
            <div className="main-image mb-5">
              <img
                src={mainImage}
                alt={product.name}
                className="w-[500px] h-auto object-cover rounded-lg"
              />
            </div>

            <div className="thumbnails flex space-x-3">
              {product.imageURI.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded ${
                    mainImage === imageUrl ? "border-2 border-orange-500" : ""
                  }`}
                  onClick={() => handleImageClick(imageUrl)}
                />
              ))}
            </div>

            <div className="product-details text-center mt-8">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-xl text-gray-600">₦ {product.price}</p>
              <p className="text-lg text-gray-500">
                Seller: {product.seller.email}
              </p>
              <p className="text-sm text-gray-500">
                Plan: {product.seller.plan}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
