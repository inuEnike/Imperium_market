import { NextFunction, Request, Response } from "express";
import Auth from "../models/auth.model";
import { signupValidationSchema } from "../validators/auth.validators";
import mongoose from "mongoose";
import transporter from "../utils/nodemailer";
import uuidv4 from 'uuidv4'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, repeatpassword, isVerified } = req.body;
        
        // Validate input
        const { error } = signupValidationSchema.validate({ firstName, lastName, email, password, repeatpassword, isVerified });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Generate a verification token
        const verificationToken = mongoose.Schema.ObjectId;

        // Create a new user
        const user = new Auth({ firstName, lastName, email, password, repeatpassword, isVerified, verificationToken });

        // Save the user to the database
        await user.save();

        // Prepare the verification URL
        const verificationUrl = `${req.protocol}://${req.get('host')}/verify-email?token=${verificationToken}`;

        // Send verification email
        await transporter.sendMail({
            from: 'inuenike@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        });

        // Respond with success message
        res.status(200).json({
            message: "User signed up successfully. Please check your email for verification.",
            user,
        });
    } catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
};

export const verifiedToken =  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Find user by verification token
        const user = await Auth.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update user to set isVerified to true and clear verificationToken
        user.isVerified = true;
        user.verificationToken = undefined; // or set to null
        await user.save();

        res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during verification', error });
    }

}