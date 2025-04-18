import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import { AuthContext } from "@/context/AuthProvider";
import axios from "axios";
import CheckoutPage from "./CheckoutPage";

const Cart = () => {
  const { cart, fetchCartItems, removeFromCart, removeAllCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchCartItems(user.email);
    }
  }, [user?.email]);

  const handleDelete = async (item) => {
    try {
      await removeFromCart(item._id, user?.email);
      await fetchCartItems(user?.email);
      window.alert("Item removed");
    } catch (error) {
      console.error("Failed to remove item:", error);
      window.alert("Failed to remove item");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await removeAllCart(user?.email);
      await fetchCartItems(user?.email);
    } catch (error) {
      console.error("Failed to remove items:", error);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASEURL}/carts/update/${item._id}`, {
        quantity: item.quantity + 1,
      });
      await fetchCartItems(user?.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (item) => {
    try {
      if (item.quantity > 1) {
        await axios.put(`${import.meta.env.VITE_BASEURL}/carts/update/${item._id}`, {
          quantity: item.quantity - 1,
        });
        await fetchCartItems(user?.email);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="m-4 sm:m-10 md:m-20">
      <div className="flex justify-end mb-4">
        <Button variant="link" onClick={handleDeleteAll} className="text-sm sm:text-base">
          Clear All
        </Button>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {cart?.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={item.image} alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button onClick={() => handleDecrease(item)} size="icon" variant="outline" className="rounded-full bg-gray-200 h-8 w-8" disabled={item.quantity === 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="icon" className="font-bold border-none h-8 w-8" disabled variant="outline">
                  {item.quantity}
                </Button>
                <Button onClick={() => handleIncrease(item)} size="icon" className="rounded-full bg-orange hover:bg-hoverOrange h-8 w-8" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-medium">${item.price * item.quantity}</p>
            </div>
            <Button size="sm" className="bg-orange hover:bg-hoverOrange w-full" onClick={() => handleDelete(item)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.image} alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button onClick={() => handleDecrease(item)} size="icon" variant="outline" className="rounded-full bg-gray-200" disabled={item.quantity === 1}>
                      <Minus />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button onClick={() => handleIncrease(item)} size="icon" className="rounded-full bg-orange hover:bg-hoverOrange" variant="outline">
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell> ₹{item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="bg-orange hover:bg-hoverOrange" onClick={() => handleDelete(item)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-xl md:text-2xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right"> ₹{orderTotal}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end my-5">
        <Button className="bg-orange hover:bg-hoverOrange w-full sm:w-auto" onClick={handleOpenModal}>
          Proceed To Checkout
        </Button>
      </div>

      {/* Checkout Modal */}
      <CheckoutPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
