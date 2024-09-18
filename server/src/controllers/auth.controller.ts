import { NextFunction, Request, Response } from "express";
import Auth from "../models/auth.model";
import { signinValidationSchema, signupValidationSchema } from "../validators/auth.validators";
import mongoose from "mongoose";
import transporter from "../utils/nodemailer";
import { uuid } from 'uuidv4';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { ENV_DATA } from "../utils/envData";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, repeatpassword, isVerified,phoneNumber } = req.body;

        // Validate input
        const { error } = signupValidationSchema.validate({ firstName, lastName, email, password, repeatpassword, phoneNumber });
        if (error) {
            return res.status(400).json({ errMessage: error.details[0].message });
        }

        // Generate a verification token
        const verificationToken = uuid();
        const findUserEmail = await Auth.findOne({ email })
        if (findUserEmail) {
            return res.status(401).json({
                errMessage: "Email has been used, Login."
            })
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10)
        
        // Create a new user
        const user = new Auth({ 
            firstName,
            lastName, 
            email, 
            password:hashPassword, 
            isVerified, 
            verificationToken,
            phoneNumber
        });

        // Save the user to the database
        await user.save();

        // Prepare the verification URL
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-token?token=${verificationToken}`;

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

export const verifiedToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;


    if (!token) {
        return res.status(400).json({ errMessage: 'Token is required' });
    }

    try {
        // Find user by verification token
        const user = await Auth.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ errMessage: 'Invalid or expired token' });
        }

        // Update user to set isVerified to true and clear verificationToken
        user.isVerified = true;
        user.verificationToken = undefined; // or set to null
        await user.save();

        res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
        res.status(500).json({ errMessage: 'An error occurred during verification', error });
    }

}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        // Validate input
        const { error } = signinValidationSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ errMessage: error.details[0].message });
        }

        // Check if user exists
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).json({ errMessage: 'User not found. Please register.' });
        }

        // Check if the password matches
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ errMessage: 'Invalid credentials.' });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(401).json({ errMessage: 'User is not verified. Please verify your email.' });
        }

        // Create a JWT token
        const tokenPayload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        const token = jwt.sign(tokenPayload, ENV_DATA.JWT_SECRET, {
            expiresIn: '10d'
        });

        return res.status(200).json({
            message: 'Signin successful.',
            token
        });
    } catch (error) {
        next(error);
    }
};