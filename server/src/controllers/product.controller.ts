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

export const Products = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({}).populate("seller", [
      "email",
      "_id",
      "plan",
    ]);
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getUserProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUser = req.user;
    const products = await Product.find({ seller: getUser.id }).populate(
      "seller",
      ["email", "_id", "plan"]
    );
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        errMessage: `No product with the ID of ${req.params.id} found`,
      });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
