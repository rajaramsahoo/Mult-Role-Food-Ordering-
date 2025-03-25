import React from 'react'
import { ArrowLeft, Clock, MapPin, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
const SingleRestaurant = () => {
  const restaurant = {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.7,
    reviews: 243,
    address: "123 Food Street, Foodville",
    openingHours: "10:00 AM - 10:00 PM",
    deliveryTime: "30-40 min",
    image: "data:image/jpeg;base64,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",
    description:
      "Authentic Indian cuisine with a modern twist. Our chefs use traditional recipes and the freshest ingredients to create memorable dining experiences.",
  }
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
    <div className="container px-4 py-6 sm:px-6 lg:px-8 mt-9">
      <div className="flex flex-col gap-6">
        {/* <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to menu
        </Link> */}

        <div className="relative rounded-lg overflow-hidden">
          <img
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            style={{ width:'100%', height: '180px' }}
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
              <Button className="bg-orange hover:bg-hoverOrange m-4">
                        <Plus className="" />
                        Add Menu
                    </Button>

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
                                <div className="mt-4 flex gap-2">
                                  <Button size="sm">Add to Cart</Button>
                                  <Button size="sm">Edit</Button>
                                  <Button size="sm">Delete</Button>

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


          <div className="sticky top-6 ">
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

export default SingleRestaurant