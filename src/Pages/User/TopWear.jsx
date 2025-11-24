import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/clothes/type/topWear";

const TopWear = () => {
    const [topWearItems, setTopWearItems] = useState([]);

    useEffect(() => {
        loadTopWear();
    }, []);

    const loadTopWear = async () => {
        try {
            const res = await axios.get(API_URL);

            // Hidden items (if admin removed from display)
            const hiddenItems = JSON.parse(localStorage.getItem("hiddenTopWear")) || [];

            const visibleItems = res.data.filter(item => !hiddenItems.includes(item.id));

            setTopWearItems(visibleItems);
        } catch (err) {
            console.error("Error loading Top Wear items:", err);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="p-20">
<h2 className="text-3xl font-bold text-center mb-8 text-[#023545]">
                TopWear Collection
            </h2>
            <h3 className="text-2xl font-serif text-center mb-8 text-[#af8314ff]">
                Trendy and comfortable tops and t shirts designed to suit every style and occasion.            </h3>
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {topWearItems.map(item => (
                    <Card
                        key={item.id}
                        id={item.id}  
                        imageUrl={item.imageUrl}
                        title={item.clothName}
                        price={item.price}
                        sizes={item.sizes}
                    />
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default TopWear;
