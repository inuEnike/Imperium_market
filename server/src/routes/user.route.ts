import express from "express";
import { signin, signup, verifiedToken } from "../controllers/auth.controller";
import { checkAdmin, verifyToken } from "../middleware/auth.middleware";
import {
  AdminRestricUser,
  getAuthenticatedUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = express();

userRouter
  .get("/user", verifyToken, getAuthenticatedUser)
  .patch("/update-user", verifyToken, updateUser)
  .patch("/restrict-user/:id", verifyToken, checkAdmin, AdminRestricUser);

export default userRouter;
