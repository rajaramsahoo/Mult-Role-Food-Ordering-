import { Globe, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const restaurants = [
    {
        id: 1,
        name: "Spicy Bites",
        city: "New York",
        country: "USA",
        cuisines: ["Italian", "Mexican"],
        imageUrl: "https://source.unsplash.com/400x250/?restaurant,food",
    },
    {
        id: 2,
        name: "Tandoori House",
        city: "London",
        country: "UK",
        cuisines: ["Indian", "BBQ"],
        imageUrl: "https://source.unsplash.com/400x250/?indianfood,restaurant",
    },
    {
        id: 3,
        name: "Sushi Delight",
        city: "Tokyo",
        country: "Japan",
        cuisines: ["Japanese", "Sushi"],
        imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    },
];

const RestaurantCard = () => {
    return (
        <div className="grid md:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
            <div
                key={restaurant.id}
                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
                <div className="relative">
                    <div className="w-full h-40 overflow-hidden">
                        <img
                            src={restaurant.imageUrl}
                            alt={restaurant.restaurantName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Featured
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {restaurant.restaurantName}
                    </h1>
                    <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm ml-1">
                            City: <span className="font-medium">{restaurant.city}</span>
                        </p>
                    </div>
                    <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm ml-1">
                            Country: <span className="font-medium">{restaurant.country}</span>
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                        {restaurant.cuisines.map((cuisine, idx) => (
                            <span
                                key={idx}
                                className="font-medium px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 shadow-sm"
                            >
                                {cuisine}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t dark:border-gray-700 border-gray-100 flex justify-end">
                    <Link to={`/restaurant/${restaurant.id}`}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                            View Menus
                        </button>
                    </Link>
                </div>
            </div>
        ))}
    </div>
    );
};

export default RestaurantCard;
