import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/homecarousel/all";

const HomeCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setSlides(res.data);
    });
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) return null;

  const current = slides[index];

  return (
    <div className="relative w-full h-[90vh] overflow-hidden mt-15">

      <AnimatePresence mode="wait">
        <motion.img
            key={current.id}
            src={current.imageUrl}
            referrerPolicy="no-referrer"
            alt="Carousel Slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover absolute inset-0"
        />

      </AnimatePresence>

      <div className="absolute inset-0 bg-opacity-80 z-10 "></div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center  pt-80 px-4 -translate-x-80">
        <h1 className="text-[#604a03ff] font-bold text-5xl md:text-6xl">
          {current.title}
        </h1>
        <p className="text-[#af8314ff] text-xl md:text-2xl mt-4">
          {current.subtitle}
        </p>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-6 text-[#604a03ff] text-3xl z-30">
        <FaWhatsapp className="hover:scale-110 transition cursor-pointer" />
        <FaInstagram className="hover:scale-110 transition cursor-pointer" />
        <FaFacebookF className="hover:scale-110 transition cursor-pointer" />
      </div>
    </div>
  );
};

export default HomeCarousel;
