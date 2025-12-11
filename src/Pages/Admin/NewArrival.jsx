import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const NewArrival = () => {
    const [clothes, setClothes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClothes();
    }, []);

    const fetchClothes = async () => {
        const res = await axios.get(API_URL);

        const deletedItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];

        // ✅ Hide deleted (locally removed) items
        const visibleItems = res.data.filter(item => !deletedItems.includes(item.id));

        setClothes(visibleItems);
    };

    const handleHideItem = (id) => {
        const deletedItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];

        const updated = [...deletedItems, id];
        localStorage.setItem("hiddenNewArrival", JSON.stringify(updated));

        // ✅ Immediately update UI
        setClothes(clothes.filter(item => item.id !== id));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f6f2ea]/50 via-[#EAF4F6]/50 to-[#f6f2ea]/50">
            <Navbar />
            
            <div className="flex-1 pt-28 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/adminPage")}
                        className="flex items-center gap-2 text-[#604a03ff] font-semibold mb-6 hover:text-[#af8314ff] transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Admin
                    </button>

                    {/* Header Card */}
                    <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/40 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-[#604a03ff]">
                                    New Arrivals
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Manage and feature new arrival items in your catalog
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-[#604a03ff] to-[#af8314ff] text-white px-6 py-3 rounded-full font-bold text-lg">
                                {clothes.length}
                            </div>
                        </div>
                    </div>

                    {/* Items Grid */}
                    {clothes.length === 0 ? (
                        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 border border-white/40 shadow-lg text-center">
                            <p className="text-gray-600 text-lg font-medium">
                                No items available in new arrivals
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {clothes.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="group bg-white/30 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 shadow-lg hover:shadow-2xl hover:bg-white/50 transform hover:-translate-y-2 transition duration-300"
                                >
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 h-80">
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.clothName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />
                                        
                                        {/* "New" Badge */}
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                            ✨ NEW
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                                    </div>

                                    <div className="p-5">
                                        {/* Item Name */}
                                        <h3 className="font-bold text-lg text-[#604a03ff] truncate group-hover:text-[#af8314ff] transition">
                                            {item.clothName}
                                        </h3>

                                        {/* Type Badge */}
                                        {item.clothType && (
                                            <div className="mt-2 inline-block bg-[#f6f2ea] text-[#604a03ff] px-3 py-1 rounded-full text-xs font-semibold">
                                                {item.clothType}
                                            </div>
                                        )}

                                        {/* Price */}
                                        <div className="mt-3 flex items-baseline gap-1">
                                            <span className="text-gray-600 text-sm">Price:</span>
                                            <span className="text-[#604a03ff] font-bold text-xl">
                                                Rs. {item.price}
                                            </span>
                                        </div>

                                        {/* Sizes Info */}
                                        {item.sizes && item.sizes.length > 0 && (
                                            <div className="mt-3">
                                                <span className="text-gray-600 text-xs font-semibold">Available Sizes:</span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {item.sizes.map((size) => (
                                                        <span key={size} className="bg-white/50 text-[#604a03ff] px-2 py-1 rounded text-xs font-medium">
                                                            {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <button
                                            onClick={() => handleHideItem(item.id)}
                                            className="mt-4 w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition font-semibold shadow-md transform hover:scale-105 active:scale-95"
                                        >
                                            🗑 Remove from Display
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NewArrival;
