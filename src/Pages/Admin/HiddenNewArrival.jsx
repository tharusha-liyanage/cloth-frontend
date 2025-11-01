import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const HiddenNewArrival = () => {
    const [hiddenItems, setHiddenItems] = useState([]);

    useEffect(() => {
        loadHiddenItems();
    }, []);

    const loadHiddenItems = async () => {
        const res = await axios.get(API_URL);

        const hiddenIds = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];

        const filtered = res.data.filter((item) => hiddenIds.includes(item.id));

        setHiddenItems(filtered);
    };

    const handleRestore = (id) => {
        const hiddenIds = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
        const updated = hiddenIds.filter((hiddenId) => hiddenId !== id);

        localStorage.setItem("hiddenNewArrival", JSON.stringify(updated));

        // Update UI immediately
        setHiddenItems(hiddenItems.filter((item) => item.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-[#023545] mb-4">
                Hidden New Arrival Items
            </h2>

            {hiddenItems.length === 0 ? (
                <p className="text-gray-600 font-medium">No hidden items available ✅</p>
            ) : (
                <div className="grid grid-cols-4 gap-6">
                    {hiddenItems.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.clothName}
                                className="w-full h-100 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{item.clothName}</h3>
                                <p className="text-gray-600">Rs. {item.price}</p>

                                <button
                                    onClick={() => handleRestore(item.id)}
                                    className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Restore Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HiddenNewArrival;
