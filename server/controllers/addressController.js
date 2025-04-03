import userModel from "../models/userModel.js";

// Add Address
export const addAddress = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, phoneNumber, label, street, city, state, zip, country } = req.body;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.address.length >= 3) {
        return res.status(400).json({ message: "Maximum 3 addresses allowed" });
      }
  
      user.address.push({ name, phoneNumber, label, street, city, state, zip, country });
      await user.save();
  
      res.status(201).json({ message: "Address added successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteAddress = async (req, res) => {
    try {
      const { userId, addressId } = req.params;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.address = user.address.filter((addr) => addr._id.toString() !== addressId);
      await user.save();
  
      res.status(200).json({ message: "Address deleted successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getUserAddresses = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ addresses: user.address });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const { name, phoneNumber, label, street, city, state, zip, country,isDefault } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const address = user.address.id(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        // Update fields
        Object.assign(address, { name, phoneNumber, label, street, city, state, zip, country, isDefault });

        await user.save();
        res.status(200).json({ message: "Address updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};