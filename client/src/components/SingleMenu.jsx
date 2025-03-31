import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useContext, useState } from "react";
import { Edit, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ResContext } from "@/context/ResProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@/context/AuthProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const SingleMenu = ({ item, isOpen, onClose }) => {
    const { user } = useContext(AuthContext)
    const isAdmin = user?.role === "admin"
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isAdmin ? "Edit Menu Item" : "View Menu Item"}</DialogTitle>
                </DialogHeader>

                {isAdmin ? (
                    // Admin view - Edit form
                    <div className="grid gap-4 py-4">
                        <div className="flex justify-center">
                            <img
                                src={item?.image}
                                alt="Item Image"
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={item?.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" defaultValue={item?.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" step="0.01" defaultValue={item?.price} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cuisine">Cuisine</Label>
                                <Select defaultValue={item?.cusine}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select cuisine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Italian">Italian</SelectItem>
                                        <SelectItem value="Indian">Indian</SelectItem>
                                        <SelectItem value="Thai">Thai</SelectItem>
                                        <SelectItem value="American">American</SelectItem>
                                        <SelectItem value="Japanese">Japanese</SelectItem>
                                        <SelectItem value="Chinese">Chinese</SelectItem>
                                        <SelectItem value="Mexican">Mexican</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select defaultValue={item?.vegNonVeg}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="veg">Veg</SelectItem>
                                    <SelectItem value="nonveg">Non-Veg</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>

                            <Input id="image" type="file" />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    // Regular user view - View details
                    <div className="grid gap-4 py-4">
                        <div className="relative">
                            <img
                                src={item?.image || "/placeholder.svg"}
                                alt={item?.name}
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <Badge
                                className={`absolute top-2 left-2 text-white ${item?.vegNonVeg === "veg" ? "bg-green-500" : "bg-red-500"}`}
                            >
                                {item?.vegNonVeg === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                            </Badge>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">{item?.name}</h3>
                            <p className="text-muted-foreground">{item?.description}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <Badge variant="outline">{item?.cusine}</Badge>
                            <Badge className="bg-primary">${item?.price.toFixed(2)}</Badge>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button onClick={onClose}>Close</Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>)
}

export default SingleMenu