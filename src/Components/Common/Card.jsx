import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, imageUrl, title, price, sizes = [] }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${id}`)}
            className="w-full sm:w-80 md:w-72 lg:w-64 xl:w-72 bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer mx-auto"
        >
            <span className="absolute top-3 left-3 bg-teal-600 text-white text-sm px-3 py-1 rounded">
                In stock
            </span>

            <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>

                <p className="text-xl font-bold text-gray-900 mb-3">
                    Rs {price.toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSize(size);
                            }}
                            className={`border px-3 py-1 rounded ${
                                selectedSize === size ? "bg-black text-white" : "bg-white"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
