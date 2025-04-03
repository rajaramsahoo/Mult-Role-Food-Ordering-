import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel", // Ensure the correct model reference
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
            index: true,
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
            min: 5,
        },
        cuisines: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],
        menus: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "menumodel",
                default: [],
            },
        ],
        imageUrl: {
            type: String,
        },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },

        openingTime: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Ensures HH:mm format
                },
                message: "Invalid time format. Use HH:mm (24-hour format)",
            },
        },
        closingTime: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Ensures HH:mm format
                },
                message: "Invalid time format. Use HH:mm (24-hour format)",
            },
        },

    },
    { timestamps: true }
);

export default mongoose.model("restaurantModel", restaurantSchema);
