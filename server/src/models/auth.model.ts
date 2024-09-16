import mongoose, {model, Schema, Document} from "mongoose";
import bcrypt from 'bcrypt'
let saltRounds = 10

interface IAuth extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean
    verificationToken: string | any
  }


const AuthSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        // unique: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
    },
    verificationToken: {
        type: String,
    }
}, {
  timestamps: true
})

// Hash password before saving
AuthSchema.pre('save', function(next) {
    // Hash the password
    bcrypt.hash(this.password as string, saltRounds, (err, hash) => {
        if (err) return next(err);
        // Override the password with the hashed one
        this.password = hash;
        next();
    });
});

const Auth = model<IAuth>('Auth', AuthSchema);

export default Auth;