import {getAllUsers, getUserById, addUser, deleteUser, updateUser} from "../services/userService.js";

export const getUsers = (req, res) => {
    const users = getAllUsers();
    res.json(users);
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