import express from "express";
import { deleteUser, getAllUsers, login, logout, signup, updateUser, verifyEmail } from "../controllers/userController.js";
import { addAddress, deleteAddress, getUserAddresses, updateAddress } from "../controllers/addressController.js";
const router = express.Router()



router.post("/signup", signup)
router.post("/login", login)
router.post("/verifyemail", verifyEmail)
router.post("/logout", logout)
router.get("/all-patner", getAllUsers)
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
//Address
router.post("/:userId/address", addAddress);
router.delete("/:userId/address/:addressId", deleteAddress); // Delete an address
router.put("/:userId/address/:addressId", updateAddress); // Update an address
router.get("/:userId/address", getUserAddresses);
export default router;