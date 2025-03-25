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
import { useState } from "react";
// import CheckoutConfirmPage from "./CheckoutConfirmPage";

const demoCart = [
  {
    _id: "1",
    name: "Product 1",
    price: 50,
    quantity: 2,
    image: "https://via.placeholder.com/50",
  },
  {
    _id: "2",
    name: "Product 2",
    price: 30,
    quantity: 1,
    image: "https://via.placeholder.com/50",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(demoCart);
  const [open, setOpen] = useState(false);

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  let totalAmount = cart.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);

  return (
    <div className="m-4 sm:m-10 md:m-20">
      <div className="flex justify-end mb-4">
        <Button variant="link" onClick={clearCart} className="text-sm sm:text-base">
          Clear All
        </Button>
      </div>

      {/* Mobile View: Stack items as cards */}
      <div className="block md:hidden space-y-4">
        {cart.map((item) => (
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
                <Button
                  onClick={() => decrementQuantity(item._id)}
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-gray-200 h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="font-bold border-none h-8 w-8"
                  disabled
                  variant="outline"
                >
                  {item.quantity}
                </Button>
                <Button
                  onClick={() => incrementQuantity(item._id)}
                  size="icon"
                  className="rounded-full bg-orange hover:bg-hoverOrange h-8 w-8"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-medium">${item.price * item.quantity}</p>
            </div>
            <Button
              size="sm"
              className="bg-orange hover:bg-hoverOrange w-full"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
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
                  <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                    <Button
                      onClick={() => decrementQuantity(item._id)}
                      size="icon"
                      variant="outline"
                      className="rounded-full bg-gray-200"
                    >
                      <Minus />
                    </Button>
                    <Button
                      size="icon"
                      className="font-bold border-none"
                      disabled
                      variant="outline"
                    >
                      {item.quantity}
                    </Button>
                    <Button
                      onClick={() => incrementQuantity(item._id)}
                      size="icon"
                      className="rounded-full bg-orange hover:bg-hoverOrange"
                      variant="outline"
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className="bg-orange hover:bg-hoverOrange"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-xl md:text-2xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">${totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange hover:bg-hoverOrange w-full sm:w-auto"
        >
          Proceed To Checkout
        </Button>
      </div>
      {/* <CheckoutConfirmPage open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Cart;