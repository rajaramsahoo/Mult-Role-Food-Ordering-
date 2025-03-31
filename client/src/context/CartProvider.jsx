import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext()

export const CartProvider = ({ children, userEmail }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async (email) => {
        let token = JSON.parse(localStorage.getItem("token")).token;

        try {
            const res = await axios.get(`${import.meta.env.VITE_BASEURL}/carts?email=${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(res.data)
            setCart(res?.data);
        } catch (error) {

        }
    }

    const addToCart = async (item, email) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASEURL}/carts`, item)
            await fetchCartItems(email)
            setCart(res.data.cartItem)
            console.log(res.data.cartItem)
        } catch (error) {
            console.log(error)
        }
    }
    const removeFromCart = async (itemId, email) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_BASEURL}/carts/delete/${itemId}`
            ); // Remove item

            if (res.status !== 200) {
                throw new Error("Failed to delete item");
            }

            console.log(res);
            await fetchCartItems(email); // Fetch updated cart items
        } catch (error) {
            console.error("Error removing item from cart:", error);
            throw error; // Ensure the error propagates
        }
    };

    const updateCartItem = (itemId, updatedItem) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId ? { ...item, ...updatedItem } : item
            )
        );
    }
    useEffect(() => {
        if (userEmail) {
            fetchCartItems(userEmail);
        }
    }, [userEmail]);
    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                fetchCartItems,
                addToCart,
                removeFromCart,
                updateCartItem,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}