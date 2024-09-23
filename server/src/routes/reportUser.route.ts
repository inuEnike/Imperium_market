import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { reportUser } from "../controllers/reportUser.controller";

const reportUserRouter = express();

reportUserRouter.post("/report-user", reportUser);

export default reportUserRouter;
