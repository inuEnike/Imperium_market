import express from "express";
import { signin, signup, verifiedToken } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = express();

authRouter
  .post("/signup", signup)
  .get("/verify-token", verifiedToken)
  .post("/signin", signin);

export default authRouter;
