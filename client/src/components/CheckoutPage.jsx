"use client"

import { useState, useContext } from "react"
import { AuthContext } from "@/context/AuthProvider"
import { CartContext } from "@/context/CartProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

const CheckoutPage = ({ open, setOpen }) => {
  const { user } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  // Static Addresses
  // const savedAddresses = [
  //   { name: "John Doe", email: "john@example.com", phone: "123-456-7890", street: "123 Main St", city: "New York", state: "NY", zipCode: "10001" },
  //   { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", street: "456 Oak St", city: "Los Angeles", state: "CA", zipCode: "90012" },
  //   { name: "Alice Johnson", email: "alice@example.com", phone: "555-555-5555", street: "789 Pine St", city: "Chicago", state: "IL", zipCode: "60611" },
  // ]
  const savedAddresses = user?.address
  // Default address state (first address)
  const [address, setAddress] = useState(savedAddresses[0])

  // Handle input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle address selection
  const selectAddress = (selectedAddress) => {
    setAddress(selectedAddress)
  }

  // Calculate total price
  const calculateTotal = () => {
    return cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Address Selection & Form */}
            <div>
              {/* Select Address Section */}
              <h3 className="text-lg font-semibold mb-4">Select Address</h3>
              <div className="space-y-2">
                {savedAddresses.map((addr, index) => (
                  <Button
                    key={index}
                    variant={addr === address ? "default" : "outline"}
                    className="w-full text-left"
                    onClick={() => selectAddress(addr)}
                  >
                    {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                  </Button>
                ))}
              </div>

              {/* Shipping Address Form */}
              <h3 className="text-lg font-semibold mt-6 mb-4">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    placeholder="John Doe"
                  />
                </div>
          
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="123-456-7890"
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="New York"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleAddressChange}
                      placeholder="10001"
                    />
                  </div>
                </div>
                <Button className="w-full mt-2" onClick={() => console.log("Address updated:", address)}>
                  Update Address
                </Button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4 max-h-[40vh] overflow-auto pr-2">
                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          {item.image && (
                            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </div>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">Your cart is empty</p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(calculateTotal() + 5).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" variant="default">
                Complete Purchase
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
