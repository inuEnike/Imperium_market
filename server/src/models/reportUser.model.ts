import mongoose, { model, Schema, Document, Types } from "mongoose";

interface IReport extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  shortNote: string;
}

const ReportUser = new Schema<IReport>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    shortNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = model("report", ReportUser);
