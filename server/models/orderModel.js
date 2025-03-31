import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required: true, // The user who placed the order
        },
        restaurantOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurantModel",
            required: true, // The restaurant owner responsible for the order
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "menumodel",
                    required: true, // Reference to the menu item
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // At least 1 item per order
                },
                price: {
                    type: Number,
                    required: true, // Price per item
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true, // Total price of the order
        },
        status: {
            type: String,
            enum: ["pending", "preparing", "out for delivery", "delivered", "cancelled"],
            default: "pending", // Default order status
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending", // Payment status
        },

    },
    { timestamps: true }
);

export default mongoose.model("orderModel", orderSchema,);