import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurantModel', required: true },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  vegNonVeg: { type: String, enum: ['veg', 'non-veg'], required: true },
  category: {
    type: String,
    enum: ["Starter", "Main Course", "Dessert", "Beverage"],
    required: true,
  },
}, { timestamps: true });

export const Menu = mongoose.model("menumodel", menuSchema);