import express from 'express'
import { signup, verifiedToken } from '../controllers/auth.controller'

const authRouter = express()

authRouter.post('/signup', signup).get('verify-token/:token', verifiedToken)

export default authRouter