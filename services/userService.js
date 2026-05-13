let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

export const getAllUsers = () => {
    return users;
};

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