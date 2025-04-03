import React, { useContext, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SingleMenu = ({ item, isOpen, onClose }) => {
    const { user } = useContext(AuthContext);
    const isAcessBy = user?.role === "admin" || user?.role === "restaurantOwner";
    const navigate = useNavigate()
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
    console.log(item?._id)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        cusine: "",
        vegNonVeg: "",
        image: "",
        newImage: null,
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                description: item.description || "",
                price: item.price || "",
                cusine: item.cusine || "", // Ensure cusine is used correctly
                vegNonVeg: item.vegNonVeg || "",
                image: item.image || "",
                newImage: null,
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                newImage: file, // Store file object
                image: URL.createObjectURL(file), // Generate preview URL
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("cusine", formData.cusine);
            formDataToSend.append("vegNonVeg", formData.vegNonVeg);


            if (formData.newImage) {
                formDataToSend.append("image", formData.newImage);
            }
            const res = await axios.put(
                `${import.meta.env.VITE_BASEURL}/menu/update/${item?._id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res)
            navigate(-1)
        } catch (error) {
            console.error("Error updating restaurant:", error);

        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isAcessBy ? "Edit Menu Item" : "View Menu Item"}</DialogTitle>
                </DialogHeader>

                {isAcessBy ? (
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="flex justify-center">
                            <img src={formData.image || "/placeholder.svg"} alt="Item Image" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cusine">Cusine</Label>
                                <Select defaultValue={formData.cusine} onValueChange={(value) => setFormData({ ...formData, cusine: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select cusine" />
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
                            <Label htmlFor="vegNonVeg">Type</Label>
                            <Select defaultValue={formData.vegNonVeg} onValueChange={(value) => setFormData({ ...formData, vegNonVeg: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="veg">Veg</SelectItem>
                                    <SelectItem value="non-veg">Non-Veg</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image Upload</Label>
                            <Input id="image" name="image" type="file" onChange={handleFileChange} />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="relative">
                            <img src={item?.image || "/placeholder.svg"} alt={item?.name} className="w-full h-48 object-cover rounded-xl" />
                            <Badge className={`absolute top-2 left-2 text-white ${item?.vegNonVeg === "veg" ? "bg-green-500" : "bg-red-500"}`}>
                                {item?.vegNonVeg === "veg" ? "Veg" : "Non-Veg"}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{item?.name}</h3>
                            <p className="text-muted-foreground">{item?.description}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <Badge variant="outline">{item?.cusine}</Badge>
                            <Badge className="bg-primary">${item?.price?.toFixed(2)}</Badge>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button onClick={onClose}>Close</Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SingleMenu;
