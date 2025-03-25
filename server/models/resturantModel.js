import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModal", // Ensure the correct model reference
            required: true,
            index: true, // Optimized indexing for faster queries
        },
        restaurantName: {
            type: String,
            required: true,
            trim: true,
            index: true, // Helpful for search operations
        },
        city: {
            type: String,
            required: true,
            trim: true,
            index: true, // Index for search performance
        },
        country: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        deliveryTime: {
            type: Number,
            required: true,
            min: 5, // Ensures delivery time is reasonable
        },
        cuisines: [
            {
                type: String,
                required: true,
                trim: true,
                enum: [
                    "Indian",
                    "Chinese",
                    "Italian",
                    "Mexican",
                    "Thai",
                    "Japanese",
                    "French",
                    "American",
                    "Mediterranean",
                    "Korean",
                    "Spanish",
                    "Middle Eastern",
                    "Vietnamese",
                    "African",
                    "Caribbean",
                ],
            },
        ],
        menus: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "menumodel",
                default: [], // Prevents undefined issues
            },
        ],
        imageUrl: {
            type: String,

        },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        rating: Number,
    },
    { timestamps: true }
);

export default mongoose.model("restaurantModel", restaurantSchema);
