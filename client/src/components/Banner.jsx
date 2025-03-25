import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Banner = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 ">
            <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8 ">
                {/* images */}

                <div className="md:w-1/2">
                    <img src="/images/home/banner.png" alt="Banner Image" />
                    <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4 ">
                        <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64 ">
                            <img
                                src="/images/home/b-food1.png"
                                alt=""
                                className="rounded-2xl"
                            />
                            <div className="space-y-1">
                                <h5>Spicy noodles</h5>
                                <div className="rating rating-sm">
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        checked
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        readOnly
                                    />
                                </div>
                                <p className="text-red">18.00</p>
                            </div>
                        </div>
                        <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
                            <img
                                src="/images/home/b-food1.png"
                                alt=""
                                className="rounded-2xl"
                            />
                            <div className="space-y-1">
                                <h5>Spicy noodles</h5>
                                <div className="rating rating-sm">
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange"
                                        checked
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                    />
                                    <input
                                        type="radio"
                                        name="rating-6"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                    />
                                </div>
                                <p className="text-red">18.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* texts */}
                <div className="md:w-1/2 space-y-7 px-4">
                    <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                        Dive into delights of Delecatable food
                    </h2>
                    <p className="text-[#4A4A4A] text-xl">
                        Where Each Plate Weaves a Story of Culinary Mastery and Passionate
                        Craftsmanship
                    </p>
                    <div className="relative flex items-center gap-2">
                        <Input
                            type="text"
                            value={searchText}
                            placeholder="Search restaurant by name, city & country"
                            onChange={(e) => setSearchText(e.target.value)}
                            className="pl-10 shadow-lg"
                        />
                        <Search className="text-gray-500 absolute inset-y-2 left-2" />
                        <Button onClick={() => navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange">Search</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
