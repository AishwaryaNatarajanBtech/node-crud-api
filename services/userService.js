import {getAllUsersRepo, getUserByIdRepo, addUserRepo, deleteUserRepo, updateUserRepo} from "../repositories/userRepository.js";

export const getAllUsers = async () => {
    return await getAllUsersRepo();
};

export const getUserById = async (id) => {
    return await getUserByIdRepo(id);
};

export const addUser = async (name, email) => {
    return await addUserRepo(name, email);
};

export const updateUser = async (id, name, email) => {
    return await updateUserRepo(id, name, email);
};

export const deleteUser = async (id) => {
    return await deleteUserRepo(id);
};

/*
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

export const getAllUsers = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(users);
        }, 500); 
    });
}

export const getUserById = (id) => {
    return users.find(u => u.id === id);
};

export const addUser = (user) => {
    users.push(user);
    return user;
};

export const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};


export const updateUser = (id, updatedUser) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    return null;
};
*/