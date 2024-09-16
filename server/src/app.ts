import express, {Express} from "express"
import authRouter from "./routes/auth.route"

const app:Express = express()

app.use(express.json());

const prefix = "/api/v1";
app.use(`${prefix}/auth`, authRouter);

export default app