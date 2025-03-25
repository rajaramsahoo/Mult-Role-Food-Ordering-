import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Home, LayoutDashboard, Users, Utensils, List, ShoppingCart, MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AdministratorSidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const Menus = [
    { title: "Home", icon: <Home size={20} />, navigate: "/" },
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, navigate: "/admin-dashboard" },
    { title: "Users", icon: <Users size={20} />, navigate: "/admin/partner", gap: true },
    { title: "Restaurants", icon: <Utensils size={20} />, navigate: "/admin/restaurant" },
    { title: "Menu", icon: <List size={20} />, navigate: "/admin/menu" },
    { title: "Orders", icon: <ShoppingCart size={20} />, navigate: "/admin/orders" },
    { title: "Reviews & Feedback", icon: <MessageSquare size={20} />, navigate: "/reviews", gap: true },
  ];
  

  return (
    <div className={` ${open ? "w-72" : "w-20"} bg-orange h-screen p-5 pt-8 relative duration-300 flex flex-col justify-between `}>
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
          className={`w-9 bg-white cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
        <h1 className={`text-white text-xl font-medium origin-left duration-200 ${!open && "scale-0"}`}>
          Admin Panel
        </h1>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 mt-6">
        {Menus.map((menu, index) => (
          <li
          onClick={() => navigate(menu.navigate)}
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-amber-100 hover:text-orange text-white text-sm items-center gap-x-4 
            ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
          >
            {menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
          </li>
        ))}
      </ul>

      {/* Profile Section */}
      <div className="border-t border-white pt-4 flex items-center gap-3 mt-auto">
        <img src="./src/assets/png" className="w-10 h-10 rounded-md" />
        <div className={`flex flex-col ${!open && "hidden"} transition-all`}>
          <h4 className="font-bold text-white">admin name</h4>
          <span className="text-xs text-white">Admin Gmail</span>
        </div>
      </div>
    </div>)
}

export default AdministratorSidebar