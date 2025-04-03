import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createMenu, editMenu, getAllMenu, getMenuByEmail, getMenuByResId, } from "../controllers/menuController.js";
const router = express.Router()



router.post("/create/:resId", isAuthenticated, upload.single("imageFile"), createMenu)
router.get("/", getAllMenu)
router.get("/:resId", isAuthenticated, getMenuByResId)
router.put("/update/:menuId", isAuthenticated, upload.single("image"), editMenu)
router.get("/owner/:id", isAuthenticated, getMenuByEmail)

export default router