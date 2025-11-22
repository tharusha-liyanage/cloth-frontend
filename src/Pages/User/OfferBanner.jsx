import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/offers/all";

export default function OfferBanner() {
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const res = await axios.get(API_URL);

            // If multiple offers → display first one (you can change this)
            if (res.data.length > 0) {
                setOffer(res.data[0]);
            }
        } catch (err) {
            console.error("Error loading offer:", err);
        }
    };

    if (!offer) return null;

    return (
        <div className="container mx-auto p-4">
        <div className="relative w-full mt-6 rounded-2xl overflow-hidden shadow-xl">
            {/* Offer Image */}
            <img
                src={offer.imageUrl}
                alt="Offer Banner"
                className="w-full h-[600px] md:h-[720px] object-cover"
            />

            {/* Overlay Gradient */}
<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center px-10">
                <p className="text-4xl md:text-4xl font-bold text-[#b1afafff] drop-shadow-lg">Special offer</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {offer.title1}
                </h1>

                <p className="text-2xl md:text-3xl text-gray-200 mt-2 drop-shadow-lg">
                    {offer.title2}
                </p>

                <p className="text-2xl md:text-3xl text-gray-200 -mb-70 mt-50 drop-shadow-lg">Mahinda Trade Center-Imaduwa</p>
            </div>
            
        </div>
        </div>
    );
}
