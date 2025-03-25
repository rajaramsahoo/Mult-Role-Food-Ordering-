import express from "express";
import { createRestaurant } from "../controllers/resturantController.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";                                
import upload from "../middlewares/multer.js";
const router = express.Router()



router.post("/create",isAuthenticated,upload.single("image"), createRestaurant)


export default router;