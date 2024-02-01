import express from "express";

import { register, login, logout, getMe, updateDetails, updatePassword, deleteUser } from "../controllers/usersController.js";
import authorize from "../middleware/auth.js";


const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/logout", authorize, logout);
router.get("/me", authorize, getMe);
router.put("/updatedetails", authorize, updateDetails);
router.put("/updatepassword", authorize, updatePassword);
router.delete("/deleteuser", authorize, deleteUser);

export default router;