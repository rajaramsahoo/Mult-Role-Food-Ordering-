"use client"

import { useContext, useState } from "react"
import { ChevronDown, EditIcon, Filter, MoveLeft, Plus, MoveRight, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResContext } from "@/context/ResProvider"
import EditResturant from "./EditResturant"
import { AuthContext } from "@/context/AuthProvider"
const Restaurant = () => {
  const { restaurant } = useContext(ResContext)
  const { user } = useContext(AuthContext)
  console.log(user.role)

  const cuisines = ["All", "Italian", "Indian", "Thai", "American", "Japanese", "Chinese", "Mexican"]
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")
  const [dietFilter, setDietFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("popularity")

  const filteredItems = restaurant.filter((item) => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCuisine !== "All") {
      try {
        const cuisinesArray = Array.isArray(item.cuisines) ? item.cuisines[0] : item.cuisines
        const parsedCuisines = JSON.parse(cuisinesArray)
        if (!parsedCuisines.includes(selectedCuisine)) {
          return false
        }
      } catch (error) {
        return false
      }
    }
    if (dietFilter === "veg" && !item.isVeg) {
      return false
    }
    if (dietFilter === "nonveg" && item.isVeg) {
      return false
    }
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "a-z") {
      return a.name.localeCompare(b.name)
    } else if (sortOrder === "z-a") {
      return b.name.localeCompare(a.name)
    } else if (sortOrder === "price-low") {
      return a.price - b.price
    } else if (sortOrder === "price-high") {
      return b.price - a.price
    }
    return b.rating - a.rating
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)

  // Get paginated items
  const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const navigate = useNavigate()

  return (
    <div className="container px-4 py-6 sm:px-6 lg:px-8 ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Explore Restaurant</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {(user.role === "admin" || user.role === "restaurantOwner") && (
              <Button
                className="bg-orange text-white hover:bg-amber-100 hover:text-orange"
                onClick={() => {
                  if (user?.role === "admin") {
                    navigate("/admin/partner-with-us");
                  } else if (user?.role === "restaurantOwner") {
                    navigate("/restaurant-owner-dashboard/new-patner");
                  }
                }}
              >
                <Plus /> Add Restaurant
              </Button>
            )}


            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for food..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 py-6 max-h-[80vh] overflow-y-auto">
                  <div>
                    <h3 className="font-medium mb-3">Cuisine</h3>
                    <div className="grid gap-2">
                      {cuisines.map((cuisine) => (
                        <div key={cuisine} className="flex items-center gap-2">
                          <Checkbox
                            id={`cuisine-${cuisine}`}
                            checked={selectedCuisine === cuisine}
                            onCheckedChange={() => setSelectedCuisine(cuisine)}
                          />
                          <Label htmlFor={`cuisine-${cuisine}`}>{cuisine}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Diet Preference</h3>
                    <RadioGroup value={dietFilter} onValueChange={setDietFilter}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">All</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veg" id="veg" />
                        <Label htmlFor="veg">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nonveg" id="nonveg" />
                        <Label htmlFor="nonveg">Non-Vegetarian</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="popularity" id="popularity" />
                        <Label htmlFor="popularity">Popularity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="a-z" id="a-z" />
                        <Label htmlFor="a-z">Name (A-Z)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="z-a" id="z-a" />
                        <Label htmlFor="z-a">Name (Z-A)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-low" id="price-low" />
                        <Label htmlFor="price-low">Price (Low to High)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-high" id="price-high" />
                        <Label htmlFor="price-high">Price (High to Low)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-[60vh] overflow-y-auto">
                <DropdownMenuLabel>Cuisine</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {cuisines.map((cuisine) => (
                    <DropdownMenuItem
                      key={cuisine}
                      onClick={() => setSelectedCuisine(cuisine)}
                      className={selectedCuisine === cuisine ? "bg-muted" : ""}
                    >
                      {cuisine}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Diet Preference</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDietFilter("all")}
                  className={dietFilter === "all" ? "bg-muted" : ""}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDietFilter("veg")}
                  className={dietFilter === "veg" ? "bg-muted" : ""}
                >
                  Vegetarian
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDietFilter("nonveg")}
                  className={dietFilter === "nonveg" ? "bg-muted" : ""}
                >
                  Non-Vegetarian
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSortOrder("popularity")}
                  className={sortOrder === "popularity" ? "bg-muted" : ""}
                >
                  Popularity
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("a-z")} className={sortOrder === "a-z" ? "bg-muted" : ""}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("z-a")} className={sortOrder === "z-a" ? "bg-muted" : ""}>
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOrder("price-low")}
                  className={sortOrder === "price-low" ? "bg-muted" : ""}
                >
                  Price (Low to High)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortOrder("price-high")}
                  className={sortOrder === "price-high" ? "bg-muted" : ""}
                >
                  Price (High to Low)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full sm:w-auto flex overflow-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="healthy">Healthy</TabsTrigger>
            <TabsTrigger value="quick">Quick Delivery</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {selectedCuisine !== "All" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Cuisine: {selectedCuisine}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setSelectedCuisine("All")}
                >
                  <span className="sr-only">Remove</span>×
                </Button>
              </Badge>
            )}
            {dietFilter !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                {dietFilter === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => setDietFilter("all")}>
                  <span className="sr-only">Remove</span>×
                </Button>
              </Badge>
            )}
            {sortOrder !== "popularity" && (
              <Badge variant="outline" className="flex items-center gap-1">
                Sort:{" "}
                {sortOrder === "a-z"
                  ? "A-Z"
                  : sortOrder === "z-a"
                    ? "Z-A"
                    : sortOrder === "price-low"
                      ? "Price (Low to High)"
                      : "Price (High to Low)"}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setSortOrder("popularity")}
                >
                  <span className="sr-only">Remove</span>×
                </Button>
              </Badge>
            )}
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 ">
              {paginatedItems.map((item) => (
                <Link
                  to={
                    user.role === "user"
                      ? `/restaurant/${item._id}`
                      : user.role === "restaurantOwner"
                        ? `/restaurant-owner/partner-with-us/${item._id}`
                        : `/admin/partner-with-us/${item._id}`
                  }
                  state={{ restaurant: item }}
                  key={item._id}
                  className="group"
                >

                  <Card className="overflow-hidden ">
                    <div className="relative">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />

                      <Badge className="absolute top-2 right-2 bg-white text-black">★ {item.rating}</Badge>

                    </div>
                    <CardContent className="pl-1 h-20 pt-2 pb-2">
                      {" "}
                      {/* Fixed height */}
                      <h3 className="font-semibold text-nowrap group-hover:text-primary transition-colors truncate">
                        {item.name}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate max-w-[70%]">{item.restaurantName}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 overflow-hidden">
                        {item.cuisines}
                      </p>
                    </CardContent>
                  </Card>
                </Link>

              ))}

            </div>
            {paginatedItems.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
              </div>
            )}
            <div className="flex justify-center items-center mt-6 gap-2">
              {currentPage > 1 && (
                <Button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <MoveLeft />
                </Button>
              )}

              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? "bg-orange text-black" : "bg-gray-200"}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              {currentPage < totalPages && (
                <Button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <MoveRight />
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Popular items</h3>
              <p className="text-muted-foreground mt-1">This tab would show popular items</p>
            </div>
          </TabsContent>

          <TabsContent value="offers" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Special offers</h3>
              <p className="text-muted-foreground mt-1">This tab would show items with special offers</p>
            </div>
          </TabsContent>

          <TabsContent value="healthy" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Healthy options</h3>
              <p className="text-muted-foreground mt-1">This tab would show healthy food options</p>
            </div>
          </TabsContent>

          <TabsContent value="quick" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Quick delivery</h3>
              <p className="text-muted-foreground mt-1">This tab would show items with quick delivery</p>
            </div>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  )
}

export default Restaurant

