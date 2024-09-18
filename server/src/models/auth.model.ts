import mongoose, {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt'
let saltRounds = 10

interface IAuth extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number
    password: string;
    isVerified: boolean
    isRestricted: boolean
    verificationToken: string | any
    plan : string
  }


const AuthSchema = new Schema<IAuth>({
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
    isRestricted: {
        type: Boolean,
    },
    verificationToken: {
        type: String,
    },
    plan: {
        type: String,
        enum: {
            values: ["Pro", "Free"],
            message: "${Value} is not supported"
        },
        default: "Free"
    }
}, {
  timestamps: true
})



const Auth = model<IAuth>('Auth', AuthSchema);

export default Auth;