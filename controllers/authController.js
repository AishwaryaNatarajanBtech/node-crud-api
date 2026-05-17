import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res) => {
    const { username, password } = req.body;

    if(username !== "aish" || password !== "fluffydog") {
        return res.status(401).json({
            message : "Invalid username or password"
        });
    }

    const token = jwt.sign(
        {
            username : username,
            role : "admin"
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message : "Login successful",
        jwt_token : token
    });
};