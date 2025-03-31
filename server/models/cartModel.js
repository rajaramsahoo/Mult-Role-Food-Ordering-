import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
    {
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'menuModel', required: true },
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 3,
        },
        image: String,
        price: Number,
        quantity: Number,
        email: {
            type: String,
            trim: true,
            required: true,
        }
    }, { timestamps: true }
)
export default mongoose.model("cartModel", cartSchema)