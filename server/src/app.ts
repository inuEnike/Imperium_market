import express, { Express } from "express";
import authRouter from "./routes/auth.route";
import { Errorhandler } from "./middleware/errorhandler";
import userRouter from "./routes/user.route";
import reportUserRouter from "./routes/reportUser.route";
import productRouter from "./routes/product.route";

const app: Express = express();

app.use(express.json());

const prefix = "/api/v1";
app.use(`${prefix}/auth`, authRouter);
app.use(`${prefix}/user`, userRouter);
app.use(`${prefix}/report`, reportUserRouter);
app.use(`${prefix}/product`, productRouter);

app.use(Errorhandler.error);

export default app;
