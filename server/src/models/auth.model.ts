import mongoose, { model, Schema, Document } from "mongoose";

interface IAuth extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  isVerified: boolean;
  isRestricted: boolean;
  verificationToken: string | any;
  plan: string;
  userType: string;
}

const AuthSchema = new Schema<IAuth>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: {
        values: ["Admin", "User"],
        message: "${Value} is not supported",
      },
      default: "User",
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    plan: {
      type: String,
      enum: {
        values: ["Gold", "Silver", "Bronze", "Platinum", 'Free'],
        message: "${Value} is not supported",
      },
      default: "Free",
    },
  },
  {
    timestamps: true,
  }
);

const Auth = model<IAuth>("Auth", AuthSchema);

export default Auth;
