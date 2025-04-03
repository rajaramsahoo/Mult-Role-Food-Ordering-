import uploadImage from "../utils/uploadImage.js";
import resturantModel from "../models/resturantModel.js";
export const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines, openingTime, closingTime } = req.body;
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
      openingTime,
      closingTime,
      createdBy: req.payload.email
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


export const editRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { _id, role } = req.payload;
    const { restaurantName, city, country, deliveryTime, cuisines, openingTime, closingTime } = req.body;

    const restaurant = await resturantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (role !== "admin" && restaurant.owner.toString() !== _id) {
      return res.status(403).json({ message: "Unauthorized to edit this restaurant" });
    }

    let imageUrl = restaurant.imageUrl;
    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const updateData = {
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines,
      imageUrl,
      openingTime,
      closingTime
    };

    const updatedRestaurant = await resturantModel.findByIdAndUpdate(
      restaurantId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    });

  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await resturantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const makeRestaurantApproved = async (req, res) => {
  try {
    const { id } = req.params; // Extracting restaurant ID from params

    const { status } = req.body; // Expecting "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    // Update restaurant status with { new: true, runValidators: true }
    const updatedRestaurant = await resturantModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );


    if (!updatedRestaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({
      success: true,
      message: `Restaurant ${status} successfully`,
      restaurant: updatedRestaurant
    });

  } catch (error) {
    console.error("Error in makeRestaurantApproved:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export const getRestaurantByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    console.log(ownerId)
    const restaurant = await resturantModel.find({ owner: ownerId });

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
