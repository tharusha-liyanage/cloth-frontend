import React, { useEffect, useState } from "react";
import axios from "axios";
import NewArrivalList from "../../Components/Common/NewArrivalList.jsx"; // ✅ Shared UI component

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const HiddenNewArrival = () => {
    const [hiddenItems, setHiddenItems] = useState([]);

    useEffect(() => {
        loadHiddenItems();
    }, []);

    const loadHiddenItems = async () => {
        const res = await axios.get(API_URL);
        const hiddenIds = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
        setHiddenItems(res.data.filter((item) => hiddenIds.includes(item.id)));
    };

    const handleRestore = (id) => {
        const hiddenIds = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
        const updated = hiddenIds.filter((hid) => hid !== id);
        localStorage.setItem("hiddenNewArrival", JSON.stringify(updated));

        setHiddenItems(hiddenItems.filter((item) => item.id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-[#023545] mb-4">
                Hidden New Arrival Items
            </h2>

            {hiddenItems.length === 0 ? (
                <p className="text-gray-600 font-medium">
                    ✅ No hidden items — All visible!
                </p>
            ) : (
                <NewArrivalList
                    clothes={hiddenItems}
                    onHide={handleRestore}
                    isAdmin={true} // ✅ shows Restore button
                />
            )}
        </div>
    );
};

export default HiddenNewArrival;
