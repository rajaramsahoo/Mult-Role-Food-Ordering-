import menuModel from "../models/menuModel.js";
import resturantModel from "../models/resturantModel.js";
import uploadImage from "../utils/uploadImage.js";


export const createMenu = async (req, res) => {
    try {
        const { name, description, price, vegNonVeg, category, cusine } = req.body;
        const { resId } = req.params;
        if (!req.file) return res.status(400).json({ success: false, message: "Image is required" });

        const existingRestaurant = await resturantModel.findById(resId);
        if (!existingRestaurant) return res.status(400).json({ success: false, message: " No Such Restaurant  exists" });

        const imageUrl = await uploadImage(req.file);
        const menu = await menuModel.create({
            restaurant: resId, name, description, price, image: imageUrl, vegNonVeg: vegNonVeg.toLowerCase(), category, cusine
        })
        res.status(201).json({ success: true, message: "Mneu Added", menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getAllMenu = async (req, res) => {
    try {
        const menu = await menuModel.find();
        res.status(200).json({ success: true, menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getMenuByResId = async (req, res) => {
    try {
        const { resId } = req.params;
        const menu = await menuModel.find({ restaurant: resId });
        res.status(200).json({ success: true, menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}