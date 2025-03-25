import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()
export const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "105h",
    });

    return token;
}