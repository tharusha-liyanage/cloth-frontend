import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/clothes";

const NewArrival = () => {
    const [clothes, setClothes] = useState([]);

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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#023545]">New Arrivals</h2>

            <div className="grid grid-cols-4 gap-6">
                {clothes.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <img src={item.imageUrl} alt={item.clothName}
                             className="w-full h-48 object-cover" />

                        <div className="p-4">
                            <h3 className="font-bold text-lg">{item.clothName}</h3>
                            <p className="text-gray-600">Rs. {item.price}</p>

                            <button
                                onClick={() => handleHideItem(item.id)}
                                className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Remove from Display
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrival;
