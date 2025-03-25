import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Cards = () => {
  // Dummy data
  const item = {
    _id: "1",
    name: "Delicious Burger",
    image: "https://via.placeholder.com/150",
    price: 199,
    recipe: "A tasty burger with fresh ingredients.",
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = () => {
    console.log(`${item.name} has been added to your cart.`);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <Heart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className="hover:scale-105 transition-all duration-300 md:h-62"
          />
        </figure>
      </Link>

      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs</span>
            {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
