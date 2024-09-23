import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { addProduct } from "../controllers/product.controller";
import { storage } from "../utils/cloudinary";
import multer from "multer";

const productRouter = express();
const upload = multer({ storage });

productRouter.post(
  "/add-product",
  upload.array("file"),
  verifyToken,
  addProduct
);

export default productRouter;
