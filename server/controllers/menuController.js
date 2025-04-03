import menuModel from "../models/menuModel.js";
import resturantModel from "../models/resturantModel.js";
import userModel from "../models/userModel.js";
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
            restaurant: resId, name, description, price, image: imageUrl, vegNonVeg: vegNonVeg.toLowerCase(), category, cusine, createdBy: req.payload.email
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

export const editMenu = async (req, res) => {
    try {
        const { menuId } = req.params;
        console.log(menuId);
        const { _id, role } = req.payload;
        const { name, description, price, vegNonVeg, category, cusine } = req.body;

        // Find menu and populate restaurant details
        const menu = await menuModel.findById(menuId).populate("restaurant"); 

        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        // Ensure restaurant exists in menu
        if (!menu.restaurant) {
            return res.status(400).json({ message: "Menu has no associated restaurant" });
        }

        // Authorization check
        if (role !== "admin" && menu.restaurant.owner.toString() !== _id) {
            return res.status(403).json({ message: "Unauthorized to edit this menu" });
        }

        let image = menu.image;
        if (req.file) {
            image = await uploadImage(req.file);
        }

        const updateData = { name, description, price, vegNonVeg, category, cusine, image };

        const updatedMenu = await menuModel.findByIdAndUpdate(
            menuId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Menu updated successfully",
            menu: updatedMenu,
        });

    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getMenuByEmail = async (req, res) => {
    try {
        const { id } = req.params

        const owner = await userModel.findById(id)
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        const menu = await menuModel.find({ createdBy: owner.email });

        res.status(200).json({ success: true, data: menu });

    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}