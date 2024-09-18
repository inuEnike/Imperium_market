import { NextFunction, Request, Response } from "express";
import { ENV_DATA } from "../utils/envData";


export class Errorhandler{
    static error(err:Error,req: Request, res: Response, next: NextFunction){
        const name = err.name
        const message = err.message
        const stack = ENV_DATA.DEVELOPMENT ? err.stack : {} 
        const statusCode = (res.statusCode ? res.statusCode : 500) as number;

        return res.status(statusCode).json({
            name,
            message,
            stackTrace: stack,
            statusCode
        })

        next()
    }
}