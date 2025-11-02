import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const UserNewArrival = () => {
    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        fetchClothes();
    }, []);

    const fetchClothes = async () => {
        const res = await axios.get(API_URL);

        const hiddenItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];

        // ✅ Show only items that admin has not hidden
        const visibleItems = res.data.filter(item => !hiddenItems.includes(item.id));

        setClothes(visibleItems);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#023545] text-center">
                ✨ New Arrivals ✨
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clothes.map((item) => (
                    <div key={item.id} className="bg-white shadow-lg rounded-2xl overflow-hidden">
                        <img
                            src={item.imageUrl}
                            alt={item.clothName}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-4 text-center">
                            <h3 className="font-bold text-lg text-[#023545]">{item.clothName}</h3>
                            <p className="text-gray-700 font-medium">Rs. {item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserNewArrival;
