import express from "express";

//import {getUser, getUsers, createUser, removeUser, modifyUser} from "../controllers/userController.js";
import {getUser, getUsers, removeUser, modifyUser} from "../controllers/userController.js";
import { authHandler } from "../middleware/authHandler.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/", authHandler, getUsers);
router.get("/:id", authHandler, getUser);
//router.post("/", authHandler, createUser);    //registration should be done without authentication, so that new users can register themselves. so, defined /auth/register route in authRoutes.js for registration, and removed authHandler middleware from createUser route here.
router.put("/:id", authHandler, modifyUser);
router.delete("/:id", authHandler, authorizeRole("admin"), removeUser);

export default router;