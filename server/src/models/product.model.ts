import mongoose, { model, Schema, Document, Types } from "mongoose";

interface IReport extends Document {
  seller: Schema.Types.ObjectId;
  name: string;
  price: string;
  description: string;
  imageURI: [];
  location: string;
  condition: string;
}

const ProductSchema = new Schema<IReport>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    price: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    imageURI: {
      type: [String],
    },
    location: {
      type: String,
    },
    condition: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model("product", ProductSchema);
