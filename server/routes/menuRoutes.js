import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createMenu, getAllMenu, getMenuByResId } from "../controllers/menuController.js";
const router = express.Router()



router.post("/create/:resId", isAuthenticated, upload.single("imageFile"), createMenu)
router.get("/", getAllMenu)
router.get("/:resId", isAuthenticated, getMenuByResId)
export default router