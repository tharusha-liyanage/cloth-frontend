import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx"; // your reusable card
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const OfficeWear = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadOfficeWear();
    }, []);

    const loadOfficeWear = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/clothes/type/officeWear"
            );

            // Remove hidden items (NewArrival system)
            const hidden = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
            const visibleItems = res.data.filter(item => !hidden.includes(item.id));

            setItems(visibleItems);
        } catch (error) {
            console.error("Error loading office wear:", error);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="p-20">
           <h2 className="text-3xl font-bold text-center mb-8 text-[#023545]">
                Office Wear Collection
            </h2>
            <h3 className="text-2xl font-serif text-center mb-8 text-[#af8314ff]">
                    Elegant, comfortable office wear designed to keep you confident and professional every day.            </h3>

            <div className="grid grid-cols-4 gap-6">
                {items.map((cloth) => (
                    <Card
                        key={cloth.id}
                        id={cloth.id}  
                        imageUrl={cloth.imageUrl}
                        title={cloth.clothName}
                        price={cloth.price}
                        sizes={cloth.sizes}
                    />
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default OfficeWear;
