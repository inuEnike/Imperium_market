/// This controller is for updating user details
import { NextFunction, Request, Response } from "express";
import { updateUserValidationSchema } from "../validators/auth.validators";
import Auth from "../models/auth.model";




export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {phoneNumber, firstName, lastName } = req.body
    updateUserValidationSchema.validate({phoneNumber, firstName, lastName })

    let updateUser = Auth.find
}


const restricUser = async (req: Request, res: Response, next: NextFunction) => {}


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {}

