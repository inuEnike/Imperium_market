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

    // Ensure the isRestricted field is provided
    if (isRestricted === undefined) {
      return res.status(400).json({
        errMessage: `The field 'isRestricted' is required.`,
      });
    }

    // Ensure user ID is provided
    if (!id) {
      return res.status(404).json({
        errMessage: `User ID is required.`,
      });
    }

    // Find the user by ID
    const findUser = await Auth.findById(id);
    if (!findUser) {
      return res.status(404).json({
        errMessage: `User not found.`,
      });
    }

    // Update the user restriction status
    const updatedUser = await Auth.findByIdAndUpdate(
      id,
      { isRestricted },
      { new: true, runValidators: true }
    );

    // After updating, check the new status to send the correct email
    if (updatedUser?.isRestricted) {
      await transporter.sendMail({
        from: "inuenike@gmail.com",
        to: updatedUser?.email,
        subject: "ACCOUNT RESTRICTED",
        text: `Dear ${updatedUser.email}, your account has been restricted. Please contact customer care to lift the restriction.`,
      });
    } else {
      await transporter.sendMail({
        from: "inuenike@gmail.com",
        to: updatedUser?.email,
        subject: "ACCOUNT UPLIFTED",
        text: `Dear ${updatedUser?.email}, your account restriction has been lifted. Please contact customer care for more information.`,
      });
    }

    // Respond with success
    return res.status(200).json({
      message: `User restriction status successfully updated.`,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// const AdminDeleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {}


export const getAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUser = req.user
    const user = await Auth.findById(getUser.id)
    console.log(getUser)
    console.log(user)
    res.status(200).json({user})
  }
  catch(error){
    next(error)
  }
}
