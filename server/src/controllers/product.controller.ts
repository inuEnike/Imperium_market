import { NextFunction, Request, Response } from "express";
import { productValidationSchema } from "../validators/product.validator";
import { Product } from "../models/product.model";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { seller, price, name, description, location, condition } = req.body;
    const Seller = req.user;

    console.log(Seller);
    const file = req?.files as Express.Multer.File[];
    console.log({ file });
    let getFilePaths = file?.map((data) => {
      return data.path;
    });
    console.log({ getFilePaths });

    const { error } = productValidationSchema.validate({
      price,
      name,
      description,
      location,
      condition,
    });
    if (error) {
      return res.status(400).json({ errMessage: error.details[0].message });
    }
    const product = new Product({
      seller: Seller.id,
      price,
      name,
      description,
      imageURI: getFilePaths,
      location,
      condition,
    });
    await product.save();
    res.status(200).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
