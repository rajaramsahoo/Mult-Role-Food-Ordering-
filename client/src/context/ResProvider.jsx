import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const ResContext = createContext()
export const ResProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
    const fetchRes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASEURL}/resturant`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRestaurant(response.data.restaurants)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    };

    const { user } = useContext(AuthContext)
    // console.log(user._id)
    const fetchResturantByOwner = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASEURL}/resturant/email/${user?._id}`)
            setRestaurant(res.data.restaurant)
            console.log(res.data.restaurant)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (user?.role == "restaurantOwner") {
            fetchResturantByOwner()
        }
        else {
            fetchRes();

        }
    }, [user]);



    return (
        <ResContext.Provider value={{ restaurant, setRestaurant, loading, fetchRes }}>
            {children}
        </ResContext.Provider>
    )
}
