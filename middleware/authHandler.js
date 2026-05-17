import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.jwt_secret = decoded;   //attach the decoded token payload to the request object, so that it can be accessed in the route handlers
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
   
    next();
};