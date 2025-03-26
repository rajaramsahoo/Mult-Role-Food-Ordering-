import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
const AddRestaurant = () => {
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
    const { user, setUser, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate()
    const [input, setInput] = useState({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: "",
        cuisines: [], // Stores selected cuisines
        imageFile: null,
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const cuisinesList = ["Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "Thai",
        "Japanese",
        "French",
        "American",
        "Mediterranean",
        "Korean",
        "Spanish",
        "Middle Eastern",
        "Vietnamese",
        "African",
        "Caribbean",];

    // Handle Cuisine Selection
    const handleCuisineChange = (cuisine) => {
        if (input.cuisines.includes(cuisine)) {
            setInput({ ...input, cuisines: input.cuisines.filter((c) => c !== cuisine) });
            console.log(input.cuisines)
        } else {
            setInput({ ...input, cuisines: [...input.cuisines, cuisine] });
        }
    };

    // Handle Input Change
    const handleChange = (e) => {
        console.log(e.target.value)
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setInput({ ...input, imageFile: e.target.files[0] });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("🚀 Submitting form data:", input);

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("country", input.country);
            formData.append("deliveryTime", input.deliveryTime.toString());
            formData.append("cuisines", JSON.stringify(input.cuisines));
            formData.append("image", input.imageFile);

            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/resturant/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("✅ Restaurant added successfully:", response.data);
            alert("Restaurant Added Successfully!");
            setLoading(true);
            setInput()
           

        } catch (error) {
            console.log(error)

        }
        finally {
            setLoading(false); 
            navigate("/admin/restaurant")
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10">
            <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                    <div>
                        <Label>Restaurant Name</Label>
                        <Input
                            type="text"
                            name="restaurantName"
                            placeholder="Enter restaurant name"
                            value={input.restaurantName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>City</Label>
                        <Input
                            type="text"
                            name="city"
                            placeholder="Enter city name"
                            value={input.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>Country</Label>
                        <Input
                            type="text"
                            name="country"
                            placeholder="Enter country name"
                            value={input.country}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label>Delivery Time</Label>
                        <Input
                            type="number"
                            name="deliveryTime"
                            placeholder="Enter delivery time"
                            value={input.deliveryTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Cuisine Selection */}
                    <div>
                        <Label>Cuisines</Label>
                        <div className="border rounded p-2 w-full cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                            {input.cuisines.length > 0 ? input.cuisines.map((cuisine) => (
                                <span key={cuisine} className="inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2">
                                    {cuisine}
                                    <button type="button" className="ml-1 text-red-600" onClick={(e) => {
                                        e.stopPropagation();
                                        handleCuisineChange(cuisine);
                                    }}>×</button>
                                </span>
                            )) : <span className="text-gray-500">Select cuisines</span>}
                        </div>
                        {showDropdown && (
                            <div className="border rounded mt-1 p-2 max-h-40 overflow-y-auto">
                                {cuisinesList.map((cuisine) => (
                                    <div key={cuisine} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1" onClick={() => handleCuisineChange(cuisine)}>
                                        <input type="checkbox" checked={input.cuisines.includes(cuisine)} readOnly />
                                        <span>{cuisine}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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

                <div className="my-5 w-fit">
                    <Button type="submit" className="bg-orange hover:bg-hoverOrange">
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
    );
};

export default AddRestaurant;
