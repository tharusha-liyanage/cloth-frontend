import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx"; 
import Navbar from "../../Components/Header&Footer/Navbar.jsx";
import Footer from "../../Components/Header&Footer/Footer.jsx";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const NewArrival = () => {
    const [clothes, setClothes] = useState([]);

    useEffect(() => {
        loadClothes();
    }, []);

    const loadClothes = async () => {
        const res = await axios.get(API_URL);
        const hidden = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
        const visibleItems = res.data.filter(item => !hidden.includes(item.id));
        setClothes(visibleItems);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>

            <div className="px-4 sm:px-6 lg:px-20 py-10 flex-1 mt-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-[#023545]">
                    New Arrivals
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-center mb-10 text-[#af8314ff]">
                    New season, new styles. Explore our newest collection designed to keep your wardrobe updated.
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {clothes.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}  
                        imageUrl={item.imageUrl}
                        title={item.clothName}
                        price={item.price}
                        sizes={item.sizes || []}
                    />
                ))}
            </div>


            </div>

            <Footer/>
        </div>
    );
};

export default NewArrival;
