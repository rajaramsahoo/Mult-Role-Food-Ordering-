import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const AddMenu = () => {
    const location = useLocation();
    const resId = location.state?.resId;

    console.log("Restaurant ID:", resId);
    let token = JSON.parse(localStorage.getItem("token"))?.token || "";
    const { setLoading, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        price: "",
        description: "",
        cusine: "",
        imageFile: null,
        category: "",
        vegNonVeg: ""
    });

    const [showCusineDropdown, setShowCusineDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showVegDropdown, setShowVegDropdown] = useState(false);

    const cusinesList = ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Japanese", "French", "American", "Mediterranean", "Korean", "Spanish", "Middle Eastern", "Vietnamese", "African", "Caribbean"];
    const categoryList = ["Starter", "Main Course", "Dessert", "Beverage"];
    const isVegList = ["veg", "non-veg"];

    const handleDropdownChange = (field, value, setDropdownState) => {
        setInput({ ...input, [field]: value });
        setDropdownState(false);
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setInput({ ...input, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            setLoading(true);
            const formData = new FormData();
            Object.entries(input).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await axios.post(
                `${import.meta.env.VITE_BASEURL}/menu/create/${resId}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            alert("Menu Item Added Successfully!");
            setInput({
                name: "",
                price: "",
                description: "",
                cusine: "",
                imageFile: null,
                category: "",
                vegNonVeg: ""
            });

            console.log(response.data);
            // navigate(`/admin/restaurant/${resId}`);
            window.location.href = `/admin/partner-with-us/${resId}`;

        } catch (error) {
            console.error("Error adding menu item:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
            <h1 className="font-extrabold text-2xl mb-5 text-center sm:text-left">Add Menu</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label>Name</Label>
                        <Input type="text" name="name" placeholder="Enter menu name" value={input.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input type="text" name="description" placeholder="Enter menu description" value={input.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input type="text" name="price" placeholder="Enter menu price" value={input.price} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label>Cusine</Label>
                        <div className="border rounded p-2 w-full cursor-pointer" onClick={() => setShowCusineDropdown(!showCusineDropdown)}>
                            <span className="text-gray-500">{input.cusine || "Select a cusine"}</span>
                        </div>
                        {showCusineDropdown && (
                            <div className="border rounded mt-1 p-2 max-h-40 overflow-y-auto">
                                {cusinesList.map((cusine) => (
                                    <div key={cusine} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownChange("cusine", cusine, setShowCusineDropdown)}>
                                        {cusine}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Category</Label>
                        <div className="border rounded p-2 w-full cursor-pointer" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                            <span className="text-gray-500">{input.category || "Select a category"}</span>
                        </div>
                        {showCategoryDropdown && (
                            <div className="border rounded mt-1 p-2 max-h-40 overflow-y-auto">
                                {categoryList.map((category) => (
                                    <div key={category} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownChange("category", category, setShowCategoryDropdown)}>
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Is Veg</Label>
                        <div className="border rounded p-2 w-full cursor-pointer" onClick={() => setShowVegDropdown(!showVegDropdown)}>
                            <span className="text-gray-500">{input.vegNonVeg || "Select an option"}</span>
                        </div>
                        {showVegDropdown && (
                            <div className="border rounded mt-1 p-2 max-h-40 overflow-y-auto">
                                {isVegList.map((vegOption) => (
                                    <div key={vegOption} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleDropdownChange("vegNonVeg", vegOption, setShowVegDropdown)}>
                                        {vegOption}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <Label>Upload Menu Banner</Label>
                        <Input type="file" accept="image/*" onChange={handleFileChange} required />
                    </div>
                </div>
                <div className="my-5 w-full flex justify-center sm:justify-start">
                    <Button type="submit" className="bg-orange hover:bg-hoverOrange w-full sm:w-auto">
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</> : "Add Your Menu"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddMenu;
