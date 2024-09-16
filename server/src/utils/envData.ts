import dotenv from "dotenv"

dotenv.config()

export const ENV_DATA:any =  {
    PORT: process.env.PORT,
    FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
    FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
    FLW_PRODUCTION_FLAG: process.env.FLW_PRODUCTION_FLAG,
}