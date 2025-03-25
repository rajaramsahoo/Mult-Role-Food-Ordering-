import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AddResturant = () => {
    let token = JSON.parse(localStorage.getItem("token")).token;
    console.log(token);

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: "",
        cuisines: "",
        imageFile: null,
    });

    // Handle Input Change
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setInput({ ...input, imageFile: e.target.files[0] });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("country", input.country);
            formData.append("deliveryTime", input.deliveryTime.toString());
            formData.append("cuisines", input.cuisines);
            formData.append("image", input.imageFile); // Image file

            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/resturant/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            alert("Restaurant Added Successfully!");
        } catch (error) {
            console.error("Error adding restaurant:", error);
            alert("Failed to add restaurant!");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div>
                <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
                <form onSubmit={handleSubmit}>
                    <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                        {/* Restaurant Name */}
                        <div>
                            <Label>Restaurant Name</Label>
                            <Input
                                type="text"
                                name="restaurantName"
                                placeholder="Enter your restaurant name"
                                value={input.restaurantName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* City */}
                        <div>
                            <Label>City</Label>
                            <Input
                                type="text"
                                name="city"
                                placeholder="Enter your city name"
                                value={input.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <Label>Country</Label>
                            <Input
                                type="text"
                                name="country"
                                placeholder="Enter your country name"
                                value={input.country}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <Label>Delivery Time</Label>
                            <Input
                                type="number"
                                name="deliveryTime"
                                placeholder="Enter your delivery time"
                                value={input.deliveryTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Cuisines */}
                        <div>
                            <Label>Cuisines</Label>
                            <Input
                                type="text"
                                name="cuisines"
                                placeholder="e.g. Momos, Biryani"
                                value={input.cuisines}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label>Upload Restaurant Banner</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="my-5 w-fit">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-orange hover:bg-hoverOrange"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Add Your Restaurant"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddResturant;