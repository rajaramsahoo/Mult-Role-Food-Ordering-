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

const CUISINE_OPTIONS = ["Italian", "Chinese", "Indian", "Mexican", "American", "Thai"];

const EditRestaurant = ({ restaurant }) => {
    const navigate = useNavigate()

    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
    const [formData, setFormData] = useState({
        name: restaurant?.name || "",
        restaurantName: restaurant?.restaurantName || "",
        city: restaurant?.city || "",
        country: restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime || "30",
        cuisines: restaurant?.cuisines || [],
        imageUrl: restaurant?.imageUrl || "",
        newImage: null,
        openingTime: restaurant?.openingTime,
        closingTime: restaurant?.closingTime
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                newImage: file,
                imageUrl: URL.createObjectURL(file), // Preview image
            }));
        }
    };

    // Handle cuisine selection (add)
    const handleAddCuisine = (e) => {
        const selectedCuisine = e.target.value;
        if (selectedCuisine && !formData.cuisines.includes(selectedCuisine)) {
            setFormData((prev) => ({
                ...prev,
                cuisines: [...prev.cuisines, selectedCuisine],
            }));
        }
    };

    // Handle removing a cuisine
    const handleRemoveCuisine = (cuisine) => {
        setFormData((prev) => ({
            ...prev,
            cuisines: prev.cuisines.filter((item) => item !== cuisine),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("restaurantName", formData.restaurantName);
            formDataToSend.append("city", formData.city);
            formDataToSend.append("country", formData.country);
            formDataToSend.append("deliveryTime", formData.deliveryTime);
            formDataToSend.append("cuisines", [formData.cuisines]);
            formDataToSend.append("openingTime", formData.openingTime);
            formDataToSend.append("closingTime", formData.closingTime);

            if (formData.newImage) {
                formDataToSend.append("image", formData.newImage);
            }

            const res = await axios.put(
                `${import.meta.env.VITE_BASEURL}/resturant/update/${restaurant._id}`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // navigate(`/admin/partner-with-us/${restaurant?._id}`, { state: { restaurant: res.data.restaurant } });
            // window.location.href = `/admin/partner-with-us/${restaurant?._id}`;
            navigate(-1)
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Badge className="absolute bottom-2 right-2 bg-white text-black cursor-pointer hover:bg-gray-100">
                    <Edit size={16} />
                </Badge>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Restaurant</DialogTitle>
                    <DialogDescription>
                        Make changes to the restaurant details here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2 py-4">
                        {/* Image Preview */}
                        {formData.imageUrl && (
                            <div className="flex justify-center">
                                <img
                                    src={formData.imageUrl}
                                    alt="Restaurant"
                                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        {/* Upload New Image */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Upload Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="restaurantName" className="text-right">
                                Restaurant Name
                            </Label>
                            <Input
                                id="restaurantName"
                                name="restaurantName"
                                value={formData.restaurantName}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                                City
                            </Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="country" className="text-right">
                                Country
                            </Label>
                            <Input
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deliveryTime" className="text-right">
                                Delivery Time (min)
                            </Label>
                            <Input
                                id="deliveryTime"
                                name="deliveryTime"
                                type="number"
                                value={formData.deliveryTime}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="openingTime" className="text-right">Opening Time</Label>
                            <Input
                                type="time"
                                name="openingTime"
                                value={formData.openingTime}
                                onChange={handleInputChange}
                                placeholder="Enter the time in 24Hr format"
                                className="col-span-3"
                                required
                            />


                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="closingTime" className="text-right">Closing Time</Label>
                            <Input
                                type="time"
                                name="closingTime"
                                value={formData.closingTime}
                                onChange={handleInputChange}
                                placeholder="Enter the time in 24Hr format"
                                required
                                className="col-span-3"
                            />

                        </div>
                        {/* Cuisine Selection */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cuisines" className="text-right">
                                Cuisines
                            </Label>
                            <select
                                id="cuisines"
                                onChange={handleAddCuisine}
                                className="col-span-3 border rounded-lg p-2"
                            >
                                <option value="">Select Cuisine</option>
                                {CUISINE_OPTIONS.map((cuisine) => (
                                    <option key={cuisine} value={cuisine}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Selected Cuisines */}
                        <div className="flex flex-wrap gap-2">
                            {formData.cuisines.map((cuisine) => (
                                <div key={cuisine} className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full">
                                    <span>{cuisine}</span>
                                    <X
                                        size={16}
                                        className="cursor-pointer text-red-500"
                                        onClick={() => handleRemoveCuisine(cuisine)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="text-white bg-orange hover:text-orange hover:bg-amber-100">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditRestaurant;
