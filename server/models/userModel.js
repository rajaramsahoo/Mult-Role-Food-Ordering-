import mongoose from "mongoose";
import addressSchema from "./addressModel.js"
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: Number,
            required: true
        },
        address: {
            type: [addressSchema],
            default: [],
            validate: {
                validator: (addresses) => {
                    // Ensure no more than 3 addresses
                    return addresses.length <= 3
                },
                message: "You can have a maximum of 3 addresses",
            },
        },
        city: {
            type: String,
            default: "Update your city"
        },
        country: {
            type: String,
            default: "Update your country"
        },
        profilePicture: {
            type: String,
            default: "https://i.ibb.co/4pDNDk1/default-profile.png",
        },
        // advanced authentication
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordTokenExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
        role: { type: String, enum: ["user", "restaurantOwner", "admin"], default: "user" },
    },
    { timestamps: true }
);

export default mongoose.model("userModel", userSchema,);