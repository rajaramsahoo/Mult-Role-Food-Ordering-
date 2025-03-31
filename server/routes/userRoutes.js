import express from "express";
import { getAllUsers, login, logout, signup, verifyEmail } from "../controllers/userController.js";
const router = express.Router()



router.post("/signup", signup)
router.post("/login", login)
router.post("/verifyemail", verifyEmail)
router.post("/logout", logout)
router.get("/all-patner", getAllUsers)

export default router;