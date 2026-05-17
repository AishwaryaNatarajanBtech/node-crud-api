import pool from "../config/db.js";

export const findUserByEmailRepo = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

export const getAllUsersRepo = async (limit, offset) => {
    const result = await pool.query("SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2", [limit, offset]);
    return result.rows;
};

export const getUserByIdRepo = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

export const addUserRepo = async (name, email, hashedPassword, role) => {
    const result = await pool.query("INSERT INTO users (name, email, password, role) values ($1, $2, $3, $4) RETURNING id, name, email, role", [name, email, hashedPassword, role]);  //skip password to be returned in the response via RETURNING clause, for security reasons
    return result.rows[0];
};

export const updateUserRepo = async (id, name, email) => {
    const result = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]);
    return result.rows[0];
};

export const deleteUserRepo = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};