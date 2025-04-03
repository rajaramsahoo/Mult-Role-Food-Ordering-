import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from './ui/button';
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  Search,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from '@radix-ui/react-separator';
import { Input } from './ui/input';
import { AuthContext } from '@/context/AuthProvider';
import { CartContext } from '@/context/CartProvider';
const Navbar = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setLoading(true)
    setUser(null)
    setLoading(false)
  }
  return (
    <div className="w-full fixed top-0 z-50 shadow-md bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="max-w-7xl mx-auto px-0">
        <div className="flex items-center justify-between h-14 ">
          <div className="">  <Link to="/">
            <h1 className="flex items-center gap-0 ">
              <img src="/images/home/logo.png" className="w-10 md:w-14" alt="Logo" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange font-extrabold text-xl md:text-3xl tracking-wide italic drop-shadow-lg">
                Ghar ka <span className="font-serif">Khana</span>
              </span>
            </h1>




          </Link></div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            {
              user?.role === "user" &&
               (
               <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent >
                    <Link to="/restaurant">
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to="/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              )
            }
            {user?.role === "admin" && (
              <Menubar>
                <MenubarMenu>
                  <Link to="/admin-dashboard">
                    <MenubarTrigger>Dashboard</MenubarTrigger>
                  </Link>
                </MenubarMenu>
              </Menubar>
            )}

            {user?.role === "restaurantOwner" && (
              <Menubar>
                <MenubarMenu>
                  <Link to="/restaurant-owner-dashboard">
                    <MenubarTrigger>Dashboard</MenubarTrigger>
                  </Link>
                </MenubarMenu>
              </Menubar>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
                  <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart?.length}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            {
              user ? <Button className="bg-orange hover:bg-hoverOrange" onClick={handleLogout}>
                {loading ? "Please wait..." : "Logout"}
              </Button> : <Button className="bg-orange hover:bg-hoverOrange" onClick={() => navigate("/login")}>
                {loading ? "Please wait..." : "login"}
              </Button>
            }

          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
const MobileNavbar = () => {
  const admin = true
  const loading = false
  const cart = 1
  const user = true
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200 m-2"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle >Ghar ka Khana</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Patel Mernstack</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                //onClick={logout}
                className="bg-orange hover:bg-hoverOrange"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};