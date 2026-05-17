import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { findUserByEmailRepo, addUserRepo } from "../repositories/userRepository.js";

dotenv.config();

export const register = async (req, res) => {
    const newUser = req.body;
    
    if(newUser.name === undefined || newUser.email === undefined || newUser.password === undefined || newUser.role === undefined) {
        throw new Error("Name, email, password, and role are required");  //this will be caught by the errorHandler middleware registered in index.js, and will return a 500 Internal Server Error response. To return a 400 Bad Request instead, we can directly send the response here without throwing an error.
        return res.status(400).json({ message: "Name, email, password, and role are required" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10); //hash the password with a salt rounds of 10

    const addedUser = await addUserRepo(newUser.name, newUser.email, hashedPassword, newUser.role);

    //const addedUser = await addUser(newUser.name, newUser.email, newUser.password);

    if (!addedUser) {
        return res.status(500).json({ message: "Failed to register user" });
    }

    res.status(201).json({ message: "User added", user: addedUser });
};

export const login = async (req, res) => {

    const email = req.body.email;

    if(email === undefined || req.body.password === undefined) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmailRepo(req.body.email);

    if (!user) {
        return res.status(401).json({
            message : "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message : "Invalid email or password"
        });
    }

    /*
    const { username, password } = req.body;

    if(username !== "aish" || password !== "fluffydog") {
        return res.status(401).json({
            message : "Invalid username or password"
        });
    }
    */

    const token = jwt.sign(
        {
            id : user.id,
            role : user.role
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