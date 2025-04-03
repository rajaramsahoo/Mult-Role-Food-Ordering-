import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const MenuContext = createContext()
export const MenuProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    console.log(user?.email)

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
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

    const getResturantMenu = async () => {
        try {
            if (!user?._id) return

            const res = await axios.get(`${import.meta.env.VITE_BASEURL}/menu/owner/${user?._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res?.data?.data) {
                setMenu(res?.data?.data)
                console.log(res?.data?.data)
            } else {
                setMenu([])
            }
        } catch (error) {
            console.error("Error fetching menu:", error)
            setMenu([])
        }
    }



    
    return (
        <MenuContext.Provider value={{ menu, setMenu, loading, fetchMenu ,getResturantMenu}}>
            {children}
        </MenuContext.Provider>
    )
}