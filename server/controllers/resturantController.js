import uploadImage from "../utils/uploadImage.js";
import resturantModel from "../models/resturantModel.js";
export const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: "Image is required" });

    const existingRestaurant = await resturantModel.findById(req.payload._id);
    if (existingRestaurant) return res.status(400).json({ success: false, message: "Restaurant already exists" });

    const imageUrl = await uploadImage(req.file);
    await resturantModel.create({
      owner: req.payload._id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: cuisines,
      imageUrl,
    });

    res.status(201).json({ success: true, message: "Restaurant Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await resturantModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, restaurants })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });

  }
}