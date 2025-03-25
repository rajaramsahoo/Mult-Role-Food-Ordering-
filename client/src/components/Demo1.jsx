import React from 'react'
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
const Demo1 = () => {
    const restaurant = {
        id: 1,
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.7,
        reviews: 243,
        address: "123 Food Street, Foodville",
        openingHours: "10:00 AM - 10:00 PM",
        deliveryTime: "30-40 min",
        image: "/placeholder.svg?height=400&width=800",
        description:
            "Authentic Indian cuisine with a modern twist. Our chefs use traditional recipes and the freshest ingredients to create memorable dining experiences.",
    }

    // Sample menu categories
    const menuCategories = [
        {
            id: 1,
            name: "Starters",
            items: [
                {
                    id: 101,
                    name: "Vegetable Samosa",
                    description: "Crispy pastry filled with spiced potatoes and peas",
                    price: 5.99,
                    isVeg: true,
                    isPopular: true,
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 102,
                    name: "Chicken Tikka",
                    description: "Tender chicken pieces marinated in spices and grilled",
                    price: 8.99,
                    isVeg: false,
                    isPopular: true,
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
        },
        {
            id: 2,
            name: "Main Course",
            items: [
                {
                    id: 201,
                    name: "Butter Chicken",
                    description: "Tender chicken cooked in a rich tomato and butter sauce",
                    price: 15.99,
                    isVeg: false,
                    isPopular: true,
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 202,
                    name: "Paneer Tikka Masala",
                    description: "Cottage cheese cubes in a spiced tomato gravy",
                    price: 13.99,
                    isVeg: true,
                    isPopular: false,
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 203,
                    name: "Lamb Rogan Josh",
                    description: "Tender lamb pieces cooked in aromatic Kashmiri spices",
                    price: 16.99,
                    isVeg: false,
                    isPopular: false,
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
        },
        {
            id: 3,
            name: "Rice & Bread",
            items: [
                {
                    id: 301,
                    name: "Garlic Naan",
                    description: "Leavened bread topped with garlic and butter",
                    price: 3.99,
                    isVeg: true,
                    isPopular: false,
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 302,
                    name: "Vegetable Biryani",
                    description: "Fragrant basmati rice cooked with mixed vegetables and spices",
                    price: 12.99,
                    isVeg: true,
                    isPopular: true,
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
        },
        {
            id: 4,
            name: "Desserts",
            items: [
                {
                    id: 401,
                    name: "Gulab Jamun",
                    description: "Deep-fried milk solids soaked in sugar syrup",
                    price: 4.99,
                    isVeg: true,
                    isPopular: true,
                    image: "/placeholder.svg?height=100&width=100",
                },
                {
                    id: 402,
                    name: "Mango Kulfi",
                    description: "Traditional Indian ice cream flavored with mango",
                    price: 5.99,
                    isVeg: true,
                    isPopular: false,
                    image: "/placeholder.svg?height=100&width=100",
                },
            ],
        },
    ]

    return (

        <div className="container px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to menu
                </Link>

                <div className="relative rounded-lg overflow-hidden">
                    <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        style={{ width: '150px', height: '180px' }}
                        className="w-full h-64 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">{restaurant.name}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <Badge className="bg-white text-black">
                                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                {restaurant.rating} ({restaurant.reviews} reviews)
                            </Badge>
                            <span className="text-white text-sm">{restaurant.cuisine}</span>
                            <span className="text-white text-sm flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {restaurant.deliveryTime}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{restaurant.address}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>{restaurant.openingHours}</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-6">{restaurant.description}</p>

                        <Tabs defaultValue="menu" className="w-full">
                            <TabsList className="mb-6">
                                <TabsTrigger value="menu">Menu</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="info">Info</TabsTrigger>
                            </TabsList>

                            <TabsContent value="menu" className="mt-0 space-y-8">
                                {menuCategories.map((category) => (
                                    <div key={category.id}>
                                        <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                                        <div className="space-y-4">
                                            {category.items.map((item) => (
                                                <Card key={item.id} className="overflow-hidden">
                                                    <CardContent className="p-0">
                                                        <div className="flex flex-col sm:flex-row">
                                                            <div className="flex-1 p-4">
                                                                <div className="flex items-start justify-between">
                                                                    <div>
                                                                        <div className="flex items-center gap-2">
                                                                            <h3 className="font-semibold">{item.name}</h3>
                                                                            <Badge className={item.isVeg ? "bg-green-500" : "bg-red-500"} variant="secondary">
                                                                                {item.isVeg ? "Veg" : "Non-Veg"}
                                                                            </Badge>
                                                                            {item.isPopular && <Badge variant="outline">Popular</Badge>}
                                                                        </div>
                                                                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                                                    </div>
                                                                    <p className="font-medium">${item.price}</p>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <Button size="sm">Add to Cart</Button>
                                                                </div>
                                                            </div>
                                                            <div className="sm:w-24 sm:h-24 h-32 w-full">
                                                                <img
                                                                    src={item.image || "/placeholder.svg"}
                                                                    alt={item.name}
                                                                    width={100}
                                                                    height={100}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-0">
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                                    <p className="text-muted-foreground mt-1">This tab would show customer reviews</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="info" className="mt-0">
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium">Restaurant Information</h3>
                                    <p className="text-muted-foreground mt-1">This tab would show detailed restaurant information</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>


                    <div className="sticky top-6">
                        <Card className="border-2 border-muted">
                            <CardContent className="p-0">
                                <div className="p-4 border-b">
                                    <h3 className="font-semibold text-lg">Your Order</h3>
                                    <p className="text-sm text-muted-foreground">From {restaurant.name}</p>
                                </div>

                                {/* Empty state - show this when cart is empty */}
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-muted-foreground"
                                        >
                                            <circle cx="8" cy="21" r="1" />
                                            <circle cx="19" cy="21" r="1" />
                                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium">Your cart is empty</h4>
                                    <p className="text-sm text-muted-foreground mt-1">Add items from the menu to start your order</p>
                                    <Button variant="outline" className="mt-4">
                                        Browse Menu
                                    </Button>
                                </div>

                                {/* Uncomment this section to show cart with items */}
                                
                  <div className="px-4 py-3 max-h-[300px] overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex gap-2">
                          <div className="bg-primary/10 text-primary w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Butter Chicken</p>
                            <p className="text-xs text-muted-foreground">Extra naan, spicy</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$31.98</p>
                          <button className="text-xs text-primary hover:underline">Edit</button>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex gap-2">
                          <div className="bg-primary/10 text-primary w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Vegetable Samosa</p>
                            <p className="text-xs text-muted-foreground">With mint chutney</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$5.99</p>
                          <button className="text-xs text-primary hover:underline">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Subtotal</span>
                      <span className="font-medium">$37.97</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Delivery Fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Tax</span>
                      <span className="font-medium">$3.04</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t mt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">$44.00</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="relative mb-4">
                      <input 
                        type="text" 
                        placeholder="Add promo code" 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                      <Button size="sm" variant="outline" className="absolute right-1 top-1">
                        Apply
                      </Button>
                    </div>
                    <Button className="w-full">
                      Checkout • $44.00
                    </Button>
                  </div>
                  

                                <div className="p-4 pt-0">
                                    <Button className="w-full" disabled>
                                        Checkout
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Demo1