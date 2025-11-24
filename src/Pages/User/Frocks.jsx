import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx";
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/clothes/type/frock";

const Frock = () => {
    const [frockItems, setFrockItems] = useState([]);

    useEffect(() => {
        loadFrockClothes();
    }, []);

    const loadFrockClothes = async () => {
        try {
            const res = await axios.get(API_URL);

            // Hidden items (if admin removed from display)
            const hiddenItems = JSON.parse(localStorage.getItem("hiddenFrock")) || [];

            const visibleItems = res.data.filter(item => !hiddenItems.includes(item.id));

            setFrockItems(visibleItems);
        } catch (err) {
            console.error("Error loading frock items:", err);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="p-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#023545]">
                Frock Collection
            </h2>
            <h3 className="text-2xl font-serif text-center mb-8 text-[#af8314ff]">
                Beautiful, comfortable frocks made to bring effortless elegance to your day.            </h3>
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {frockItems.map(item => (
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

export default Frock;
