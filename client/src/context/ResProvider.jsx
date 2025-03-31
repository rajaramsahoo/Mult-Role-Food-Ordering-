import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
    useEffect(() => {


        fetchRes();
    }, []);
  
    return (
        <ResContext.Provider value={{ restaurant, setRestaurant, loading, fetchRes }}>
            {children}
        </ResContext.Provider>
    )
}
