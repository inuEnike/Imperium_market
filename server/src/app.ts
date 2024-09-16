import express, {Express} from "express"
import authRouter from "./routes/auth.route"

const app:Express = express()

let prefix = `api/vi/`
app.use(`${prefix}/auth/`, authRouter)

export default app