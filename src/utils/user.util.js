import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

export function generateJwt(id,email) {
    const payload={
        id,
        email
    }
    console.log(payload)
    return jwt.sign(payload,process.env.SECRET)
}
