import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Header&Footer/Navbar";
import Footer from "../Header&Footer/Footer";

const API_URL = "http://localhost:8080/api/clothes/id/";

const ProductDetails = () => {
    const { id } = useParams(); // get ID from URL
    const [item, setItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        loadItem();
    }, []);

    const loadItem = async () => {
        const res = await axios.get(`${API_URL}${id}`);
        setItem(res.data);
    };

    if (!item) {
        return <h2 className="text-center mt-20 text-xl">Loading...</h2>;
    }

    const totalStock = Object.values(item.stockCount || {}).reduce((a, b) => a + b, 0);
    const lowStock = totalStock <= 2;

    return (
        <div>
            <Navbar/>
        <div className="max-w-6xl mx-auto p-20 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT IMAGE */}
            <div>
                <img
                    src={item.imageUrl}
                    alt={item.clothName}
                    className="w-full rounded-lg shadow-lg"
                />
            </div>

            {/* RIGHT DETAILS */}
            <div>
                <h2 className="text-3xl font-bold mb-3">{item.clothName}</h2>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Rs. {item.price.toLocaleString()}
                </h3>

                {/* STOCK LABEL */}
                {lowStock ? (
                    <p className="text-red-500 font-semibold mb-3">
                        Hurry! Only {totalStock} units left in stock!
                    </p>
                ) : (
                    <p className="text-green-600 font-semibold mb-3">
                        In Stock ({totalStock} items available)
                    </p>
                )}

                {/* SIZE SELECTOR */}
                <h4 className="font-bold mt-6 mb-2">Size</h4>
                <div className="flex gap-3 flex-wrap">
                    {item.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded border 
                                ${selectedSize === size ? 
                                    "bg-black text-white" : 
                                    "hover:bg-black hover:text-white"}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {/* Buy Now */}
                <button
                    disabled={!selectedSize}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-bold 
                        ${selectedSize ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    Buy Now
                </button>

            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default ProductDetails;
