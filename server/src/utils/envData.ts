import dotenv from "dotenv"

dotenv.config()

export const ENV_DATA: any = {
    PORT: process.env.PORT,
    FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
    FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
    FLW_PRODUCTION_FLAG: process.env.FLW_PRODUCTION_FLAG,
    DB_URI: process.env.DB_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILER_NAME: process.env.MAILER_NAME,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
    DEVELOPMENT: process.env.DEVELOPMENT
}