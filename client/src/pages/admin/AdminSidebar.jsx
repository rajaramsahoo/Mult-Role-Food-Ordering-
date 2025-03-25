import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const AdminSidebar = () => {

    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Dashboard", src: "Chart_fill" },
        { title: "Inbox", src: "Chat" },
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule", src: "Calendar" },
        { title: "Search", src: "Search" },
        { title: "Analytics", src: "Chart" },
        { title: "Files", src: "Folder", gap: true },
        { title: "Setting", src: "Setting" },
    ];
    return (
        <div className={` ${open ? "w-72" : "w-20"} bg-gray-900 h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between`}>
            <Button
                size="icon"
                className={`bg-gray-200 text-black hover:bg-gray-300 absolute cursor-pointer right-2 top-6
          border-gray-700 border-2 rounded-full ${!open && "rotate-180 left-1/2 -translate-x-1/2 "} `}
                onClick={() => setOpen(!open)}
                variant="outline"
            >
                <Menu size={18} />
            </Button>

            {/* Logo & Title */}
            <div className={`flex gap-x-4 items-center ${!open && "hidden"}`}>
                <img
                    src="/images/home/logo.png"
                    className={`w-9 bg-black cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                />
                <h1 className={`text-white text-xl font-medium origin-left duration-200 ${!open && "scale-0"}`}>
                    Admin Panel
                </h1>
            </div>

            {/* Menu Items */}
            <ul className="flex-1 mt-6">
                {Menus.map((menu, index) => (
                    <li
                        key={index}
                        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
                    >
                        <img src={`./src/assets/${menu.src}.png`} />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                    </li>
                ))}
            </ul>

            {/* Profile Section */}
            <div className="border-t border-gray-700 pt-4 flex items-center gap-3 mt-auto">
                <img src="./src/assets/png" className="w-10 h-10 rounded-md" />
                <div className={`flex flex-col ${!open && "hidden"} transition-all`}>
                    <h4 className="font-semibold">constGenius</h4>
                    <span className="text-xs text-gray-400">constgenius@gmail.com</span>
                </div>
                <Menu size={20} className="ml-auto cursor-pointer" />
            </div>
        </div>
    )
}

export default AdminSidebar