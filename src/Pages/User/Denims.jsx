import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx"; 
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/clothes/type/denim";

const Denims = () => {
    const [denimItems, setDenimItems] = useState([]);

    useEffect(() => {
        loadDenimClothes();
    }, []);

    const loadDenimClothes = async () => {
        try {
            const res = await axios.get(API_URL);

            // Remove hidden denim items (if admin removed)
            const hiddenItems = JSON.parse(localStorage.getItem("hiddenDenim")) || [];
            const visibleItems = res.data.filter(item => !hiddenItems.includes(item.id));

            setDenimItems(visibleItems);
        } catch (err) {
            console.error("Error loading denim clothes:", err);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="p-20">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#023545]">
                Denim Collection
            </h2>
            <h3 className="text-2xl font-serif text-center mb-8 text-[#af8314ff]">
            Timeless denim designed for all-day comfort and effortless style.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {denimItems.map(item => (
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

export default Denims;
