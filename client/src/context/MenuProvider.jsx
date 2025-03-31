import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MenuContext = createContext()
export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASEURL}/menu`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setMenu(response.data.menu)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };

        fetchMenu();
    }, []);
    return (
        <MenuContext.Provider value={{ menu, setMenu, loading }}>
            {children}
        </MenuContext.Provider>
    )
}