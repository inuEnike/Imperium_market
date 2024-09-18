import express, {Express} from "express"
import authRouter from "./routes/auth.route"
import { Errorhandler } from "./utils/errorhandler";

const app:Express = express()

app.use(express.json());

const prefix = "/api/v1";
app.use(`${prefix}/auth`, authRouter);

app.use(Errorhandler.error)

export default app