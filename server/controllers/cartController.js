import cartModel from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { name, recipe, image, price, email, quantity, menuItemId } = req.body;
        const existingCartItem = await cartModel.findOne({ email, menuItemId });
        if (existingCartItem) {
            return res
                .status(403)
                .json({ message: "Product already exists in the cart." });
        }
        const cartItem = await cartModel.create({
            name,
            recipe,
            image,
            price,
            email,
            quantity,
            menuItemId,
        });

        res.status(201).json({ sucess: true, message: "Item Added To Cart", cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await cartModel.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartModel.findByIdAndUpdate(id, { quantity: quantity },
            { new: true, runValidators: true })

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart Item not found" });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCart = async (req, res) => {

    const { cartId } = req.params;


    if (!cartId) {
        return res.status(400).json({ message: "Invalid or missing ID parameter" });
    }

    try {
        const deletedCart = await cartModel.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart Item not found" });
        }

        res.status(200).json({ message: "Cart Item Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
