/// This controller is for updating user details
import { NextFunction, Request, Response } from "express";
import { updateUserValidationSchema } from "../validators/auth.validators";
import Auth from "../models/auth.model";
import transporter from "../utils/nodemailer";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract data from request body
    const { phoneNumber, firstName, lastName } = req.body;

    // Validate the request body using the schema
    updateUserValidationSchema.validate({ phoneNumber, firstName, lastName });

    // Assuming req.user contains the authenticated user's info (e.g., from JWT middleware)
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Find and update the user
    const updatedUser = await Auth.findOneAndUpdate(
      { _id: userId }, // Find user by ID
      { phoneNumber, firstName, lastName }, // Fields to update
      { new: true, runValidators: true } // Options to return updated document and validate before saving
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send response with the updated user info
    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // If validation or other error occurs, pass it to the error handler
    next(error);
  }
};

export const AdminRestricUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { isRestricted } = req.body;
    if (isRestricted === undefined) {
      return res.status(404).json({
        errMesage: `The Field is required`,
      });
    }
    if (!id) {
      return res.status(404).json({
        errMesage: `User with the id of ${id} not found`,
      });
    }
    const findUser = await Auth.findById(id);
    if (!findUser) {
      return res.status(404).json({
        errMesage: `User not found`,
      });
    }

    const user = await Auth.findByIdAndUpdate(
      id,
      { isRestricted },
      { new: true, runValidators: true } // Options to return updated document and validate before saving);
    );

    const checkUserRestriction = findUser;
    if (checkUserRestriction?.isRestricted) {
      await transporter.sendMail({
        from: "inuenike@gmail.com",
        to: findUser.email,
        subject: "ACCOUNT RESTRICTED",
        text: `Dear ${findUser.email} your account has been resrticted, Please contact customer care to uplift the restriction`,
      });
    } else {
      await transporter.sendMail({
        from: "inuenike@gmail.com",
        to: findUser.email,
        subject: "ACCOUNT UPLIFTED",
        text: `Dear ${findUser.email} your account has been Uplifted, Please contact customer care for more information`,
      });
    }

    res.status(201).json({
      message: "User successfully Restriced .",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const AdminDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
