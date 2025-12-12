import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/offers/all";

const TypewriterText = ({ text, speed = 90, pause = 1200, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer;

    if (typing) {
      if (index < text.length) {
        timer = setTimeout(() => {
          setDisplayed(text.slice(0, index + 1));
          setIndex(index + 1);
        }, speed);
      } else {
        setTyping(false);
        timer = setTimeout(() => {}, pause);
      }
    } else {
      if (index > 0) {
        timer = setTimeout(() => {
          setDisplayed(text.slice(0, index - 1));
          setIndex(index - 1);
        }, speed / 1.5);
      } else {
        setTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [index, typing, text, speed, pause]);

  return (
    <span className={`${className} typewriter-text`}>
      {displayed}
      <span className="cursor">|</span>
    </span>
  );
};

export default function OfferBanner() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const res = await axios.get(API_URL);
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
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl mt-6">

        {/* Banner Image */}
        <img
          src={offer.imageUrl}
          alt="Offer Banner"
          className="w-full h-[350px] sm:h-[480px] md:h-[650px] object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Offer Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">

          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#b1afaf] drop-shadow-lg">
            Special Offer
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {offer.title1}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mt-2 drop-shadow-lg">
            <TypewriterText text={offer.title2} />
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-6 drop-shadow-lg">
            Mahinda Trade Center - Imaduwa
          </p>
        </div>
      </div>
    </div>
  );
}
