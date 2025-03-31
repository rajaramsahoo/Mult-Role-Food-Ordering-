import express from "express";
import { createRestaurant, editRestaurant, getRestaurants, getSingleRestaurant, makeRestaurantApproved } from "../controllers/resturantController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
const router = express.Router()



router.post("/create", isAuthenticated, upload.single("image"), createRestaurant)
router.get("/", isAuthenticated, getRestaurants)
router.get("/:id", isAuthenticated, getSingleRestaurant)

router.put("/update/:restaurantId", isAuthenticated, upload.single("image"), editRestaurant)

router.put("/status/:id", isAuthenticated, makeRestaurantApproved)

export default router;