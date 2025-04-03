"use client"

import { useContext, useEffect, useState } from "react"
import { Clock, MapPin, Plus, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import EditResturant from "./EditResturant"
import axios from "axios"
import { AuthContext } from "@/context/AuthProvider"
const SingleRestaurant = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token || ""

  const location = useLocation()
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(location?.state?.restaurant || null)
  console.log(restaurant)
  const [menuCategories, setMenuCategories] = useState([])
  //const restaurant = location?.state?.restaurant
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  console.log(user?.role)
  useEffect(() => {
    if (restaurant?._id) {
      fetchRestaurantData()
      getResturantMenu()
    }
  }, [restaurant?._id])

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/resturant/${restaurant?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.restaurant
      setRestaurant(data)
    } catch (error) {
      console.error("Error fetching restaurant data:", error)
    }
  }

  const makeRestaurantApproved = async (status) => {
    try {
      console.log("Approving Restaurant with status:", status)
      console.log(import.meta.env.VITE_BASEURL)
      const response = await axios.put(
        `${import.meta.env.VITE_BASEURL}/resturant/status/${restaurant?._id}`,
        { status }, // Correct payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(response.data)
      alert("Restaurant Approved Successfully!")
      fetchRestaurantData()
    } catch (error) {
      console.error("Error approving restaurant:", error)
    }
  }

  const getResturantMenu = async () => {
    try {
      if (!restaurant?._id) return

      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/menu/${restaurant._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res?.data?.menu) {
        setMenuCategories(res.data.menu)
        console.log(res.data.menu)
      } else {
        setMenuCategories([])
      }
    } catch (error) {
      console.error("Error fetching menu:", error)
      setMenuCategories([])
    }
  }

  const categories = [...new Set(menuCategories.map((item) => item.category))];
  console.log(categories)

  return (
    <div className="container px-4 py-0 sm:px-6 lg:px-8 mt-9">
      <div className="flex flex-col gap-6">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={restaurant?.imageUrl || "/placeholder.svg"}
            alt={restaurant?.name}
            style={{ width: "100%", height: "180px" }}
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute z-50 bottom-1 right-1">
            <EditResturant restaurant={restaurant} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{restaurant?.restaurantName}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge className="bg-white text-black">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {restaurant?.rating} ({restaurant?.reviews} reviews)
              </Badge>
              <span className="text-white text-sm">
                {restaurant?.cuisines}
              </span>

              <span className="text-white text-sm flex items-center">
                <Clock className="h-3 w-3 mr-1 " />
                {restaurant?.deliveryTime}min
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>
                  {restaurant?.city},{restaurant?.country}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{restaurant?.openingTime}AM - {restaurant?.closingTime}PM </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{restaurant?.description}</p>

            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>

              {
                user?.role === "admin" &&
                <Button
                  className="bg-orange hover:bg-hoverOrange m-4"
                  onClick={() => navigate(`/admin/new-item`, { state: { resId: restaurant._id } })}
                >
                  <Plus className="" />
                  Add Menu
                </Button>
              }


              {
                user?.role === "restaurantOwner" &&
                <Button
                  className="bg-orange hover:bg-hoverOrange m-4"
                  onClick={() => navigate(`/restaurant-owner/new-item`, { state: { resId: restaurant._id } })}
                >
                  <Plus className="" />
                  Add Menu
                </Button>
              }

              {
                user?.role === "admin" && <DropdownMenu className="p-4">
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-orange hover:bg-hoverOrange m-4">{restaurant?.status}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-16">
                    <DropdownMenuLabel onClick={() => makeRestaurantApproved("approved")}>Approve</DropdownMenuLabel>
                    <DropdownMenuLabel onClick={() => makeRestaurantApproved("rejected")}>Reject</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              }


              <TabsContent value="menu" className="mt-0 space-y-8">

                {menuCategories && menuCategories.length > 0 ? (
                  categories.map((category) => (
                    <div className="" key={category}>
                      <h2 className="text-xl font-semibold mb-4">{category}</h2>
                      <div className="space-y-4">
                        {menuCategories
                          .filter((menu) => menu.category === category)
                          .map((menu) => (
                            <Card key={menu._id} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row">
                                  <div className="flex-1 p-4">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-semibold">{menu.name}</h3>
                                          <Badge className={menu.vegNonVeg === "veg" ? "bg-green-500" : "bg-red-500"}>
                                            {menu.vegNonVeg === "veg" ? "Veg" : "Non-Veg"}
                                          </Badge>
                                          {menu.isPopular && <Badge variant="outline">Popular</Badge>}
                                        </div>
                                        <p className="text-sm text-gray-600">{menu.description}</p>
                                        <p className="text-md font-semibold mt-2">₹{menu.price}</p>
                                      </div>
                                      <img
                                        src={menu.image || "/placeholder.svg"}
                                        alt={menu.name}
                                        className="w-16 h-16 rounded-md object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No Menu Item Avialable</h3>
                    <p className="text-muted-foreground mt-1">Please Add Some items</p>
                  </div>)}

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

          <div className="sticky top-6 overflow-hidden">
            <Card className="border-2 border-muted">
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">Your Order</h3>
                  <p className="text-sm text-muted-foreground">From {restaurant?.restaurantName}</p>
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
                  <Button className="w-full">Checkout • $44.00</Button>
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

