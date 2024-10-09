import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import {
  addProduct,
  getSingleProduct,
  getUserProducts,
  Products,
} from "../controllers/product.controller";
import { storage } from "../utils/cloudinary";
import multer from "multer";

const productRouter = express();
const upload = multer({ storage });

productRouter
  .post("/add-product", upload.array("file"), verifyToken, addProduct)
  .get("/products", Products)
  .get("/product/:id", getSingleProduct)
  .get("/user-products", verifyToken, getUserProducts);

export default productRouter;
