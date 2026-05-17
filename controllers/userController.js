//import {getAllUsers, getUserById, addUser, deleteUser, updateUser} from "../services/userService.js";
import {getAllUsers, getUserById, deleteUser, updateUser} from "../services/userService.js";


export const getUsers = async (req, res, next) => { //next parameter is added to pass the error to the errorHandler middleware registered in index.js
    try {
        const page = parseInt(req.query.page) || 1;   //get the page number from query parameters, default to 1 if not provided
        const limit = parseInt(req.query.limit) || 20;  //get the limit from query parameters, default to 20 if not provided
        const offset = (page - 1) * limit;   //calculate the offset for pagination


        const users = await getAllUsers(limit, offset);
        res.json({
            requestTime: req.requestTime,   //attribute requestTime set by requestTime middleware registered in index.js, before the routes
            data : users
        });
    } catch (error) {
        next(error);    //pass the error to the errorHandler middleware registered in index.js
    }
};

export const getUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await getUserById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};

/*
export const createUser = async (req, res) => {
    const newUser = req.body;

    if(newUser.name === undefined) {
        throw new Error("Name is required");  //this will be caught by the errorHandler middleware registered in index.js, and will return a 500 Internal Server Error response. To return a 400 Bad Request instead, we can directly send the response here without throwing an error.
        return res.status(400).json({ message: "Name is required" });
    }

    const addedUser = await addUser(newUser.name, newUser.email);
    res.status(201).json({ message: "User added", user: addedUser });
};
*/

export const removeUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await deleteUser(id);

    if (!success) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
};

export const modifyUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await updateUser(id, req.body.name, req.body.email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated", user });
};