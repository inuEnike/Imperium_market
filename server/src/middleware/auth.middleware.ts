import { ENV_DATA } from "./../utils/envData";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers.authorization;
    if (authHeaders || authHeaders?.startsWith("Bearer ")) {
      const token = authHeaders?.split(" ")[1];
      if (!token) {
        return res.status(500).json({
          errMessage: "Authentiaon Required",
        });
      }
      jwt.verify(token, ENV_DATA.JWT_SECRET as string, (err, payload) => {
        if (err) {
          next(err);
        } else {
          const data = payload;
          req.user = payload;
          next();
        }
      });
    } else {
      return res.status(500).json({
        errMessage: "No | Invalid Token || Authentiaon Required",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findAdmin = req.user;
    console.log(findAdmin);
    if (findAdmin.userType != "Admin") {
      return res.status(500).json({
        errMessage: "User not an admin",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
