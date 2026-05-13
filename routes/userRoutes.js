import express from "express";

import {getUser, getUsers, createUser, removeUser, modifyUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", modifyUser);
router.delete("/:id", removeUser);

export default router;