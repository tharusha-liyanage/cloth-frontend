import React, { useEffect, useState } from "react";
import axios from "axios";
import NewArrivalList from "../../Components/Common/NewArrivalList.jsx";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const NewArrival = () => {
    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        fetchClothes();
    }, []);

    const fetchClothes = async () => {
        const res = await axios.get(API_URL);
        const hidden = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
        setClothes(res.data.filter(item => !hidden.includes(item.id)));
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-[#023545]">✨ New Arrivals ✨</h2>
            <NewArrivalList clothes={clothes} isAdmin={false} />
        </div>
    );
};

export default NewArrival;
