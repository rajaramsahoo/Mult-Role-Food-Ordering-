import { Button } from "@/components/ui/button";
import { Loader2, Menu } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const loading = false;
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
        <div
            className={`${open ? "w-72" : "w-20"} 
            fixed left-0 top-0 h-screen bg-gray-900 p-5 pt-8 duration-300 text-white flex flex-col overflow-hidden`}
        >
            {/* Toggle Button */}
            <Button
                size="icon"
                className={`bg-gray-200 text-black hover:bg-gray-300 absolute cursor-pointer right-2 top-6 border-gray-700 border-2 rounded-full ${!open && "rotate-180 left-1/2 -translate-x-1/2"} `}
                onClick={() => setOpen(!open)}
                variant="outline"
            >
                <Menu size={18} />
            </Button>

            {/* Logo & Title */}
            <div className={`flex gap-x-4 items-center ${!open && "hidden"}`}>
            <img
                    src="/images/home/logo.png"
                    className={`w-9 bg-black cursor-pointer duration-500 ${open && "rotate-[360deg] "}`}
                />
                <h1 className={`text-white text-xl font-medium origin-left duration-200 ${!open && "scale-0"}`}>
                    Admin Panel
                </h1>
            </div>

            {/* Sidebar Menu */}
            <ul className="pt-6 flex-1 overflow-hidden">
                {Menus.map((menu, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-x-4 p-3 cursor-pointer rounded-md text-sm hover:bg-gray-800 transition duration-200 ${menu.gap ? "mt-6" : "mt-2"} ${index === 0 && "bg-gray-700"}`}
                    >
                        <img src={`./src/assets/${menu.src}.png`} className="w-5 h-5" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                    </li>
                ))}
            </ul>

            {/* Profile Section at Bottom */}
            <div className="border-t border-gray-700 pt-4 flex items-center gap-3">
                <img src="./src/assets/png" className="w-10 h-10 rounded-md" />
                <div className={`flex flex-col ${!open && "hidden"} transition-all`}>
                    <h4 className="font-semibold">constGenius</h4>
                    <span className="text-xs text-gray-400">constgenius@gmail.com</span>
                </div>
                <Menu size={20} className="ml-auto cursor-pointer" />
            </div>
        </div>
    );
};

export default Sidebar;
