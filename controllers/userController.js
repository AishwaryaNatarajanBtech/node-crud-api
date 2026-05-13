import {getAllUsers, getUserById, addUser, deleteUser, updateUser} from "../services/userService.js";

export const getUsers = async (req, res, next) => { //next parameter is added to pass the error to the errorHandler middleware registered in index.js
    try {
        const users = await getAllUsers();
        res.json({
            requestTime: req.requestTime,   //attribute requestTime set by requestTime middleware registered in index.js, before the routes
            data : users
        });
    } catch (error) {
        next(error);    //pass the error to the errorHandler middleware registered in index.js
    }
};

export const getUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};

export const createUser = (req, res) => {
    const newUser = req.body;

    if(newUser.name === undefined) {
        throw new Error("Name is required");  //this will be caught by the errorHandler middleware registered in index.js, and will return a 500 Internal Server Error response. To return a 400 Bad Request instead, we can directly send the response here without throwing an error.
        return res.status(400).json({ message: "Name is required" });
    }

    const addedUser = addUser(newUser);
    res.status(201).json({ message: "User added", user: addedUser });
};

export const removeUser = (req, res) => {
    const id = parseInt(req.params.id);
    const success = deleteUser(id);

    if (!success) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
};

export const modifyUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = updateUser(id, req.body);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated", user });
};