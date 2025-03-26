import express from "express";
import { createRestaurant, getRestaurants } from "../controllers/resturantController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = express.Router()



router.post("/create", isAuthenticated, upload.single("image"), createRestaurant)
router.get("/", isAuthenticated, getRestaurants)


export default router;