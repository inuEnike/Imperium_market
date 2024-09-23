import { NextFunction, Request, Response } from "express";
import { reportUserValidationSchema } from "../validators/reportUser.validator";
import Auth from "../models/auth.model";
import { Report } from "../models/reportUser.model";
import { startSession } from "mongoose";
import transporter from "../utils/nodemailer";

export const reportUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { user, title, shortNote } = req.body;
    const { error } = reportUserValidationSchema.validate({
      user,
      title,
      shortNote,
    });

    // Validation error handling
    if (error) {
      return res.status(400).json({ errMessage: error.details[0].message });
    }

    // Find the user being reported
    const findUser = await Auth.findById(user).session(session);
    console.log(findUser);
    if (!findUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        errMessage: "User not found",
      });
    }

    // Find previous reports for the user
    const findUserReports = await Report.find({ user: findUser._id }).session(
      session
    );

    const findUserReportLength = findUserReports.length;
    console.log(findUserReportLength);

    // Restrict user if there are 3 or more reports
    if (findUserReportLength >= 3) {
      findUser.isRestricted = true;
      await findUser.save({ session });
      await transporter.sendMail({
        from: "inuenike@gmail.com",
        to: findUser.email,
        subject: "ACCOUNT RESTRICTED",
        text: `Dear ${findUser.email} your account has been resrticted, Please contact customer care to uplift the restriction`,
      });
    }

    // Save the new report
    const saveReport = new Report({
      user: findUser._id,
      title,
      shortNote,
    });

    await saveReport.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return success response
    return res.status(200).json({
      message: "Reported user successfully",
    });
  } catch (error) {
    // Abort transaction on error and end session
    await session.abortTransaction();
    session.endSession();
    console.error("Error reporting user:", error);
    return res.status(500).json({ errMessage: "An error occurred." });
  }
};

export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implement the delete report logic here
};
