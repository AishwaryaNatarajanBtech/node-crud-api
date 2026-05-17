import express from "express";

import {getUser, getUsers, createUser, removeUser, modifyUser} from "../controllers/userController.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/", authHandler, getUsers);
router.get("/:id", authHandler, getUser);
router.post("/", authHandler, createUser);
router.put("/:id", authHandler, modifyUser);
router.delete("/:id", authHandler, removeUser);

export default router;