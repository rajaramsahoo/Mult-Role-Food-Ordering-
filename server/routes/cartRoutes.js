import express from "express"
import { addToCart, deleteCart, getCartByEmail, updateCart, deleteAllCartItem } from "../controllers/cartController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.post('/', addToCart)
router.get('/', isAuthenticated, getCartByEmail)
router.delete('/delete/:cartId', deleteCart)
router.put("/update/:id", updateCart);
router.delete('/clear/:email', deleteAllCartItem)

export default router