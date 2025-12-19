import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Common/Card.jsx";
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

      const hidden =
        JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
      const visibleItems = res.data.filter(
        (item) => !hidden.includes(item.id)
      );

      setItems(visibleItems);
    } catch (error) {
      console.error("Error loading office wear:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      {/* ✅ Navbar spacer */}
      <div className="h-[76px] md:h-[72px]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[#023545]">
          Office Wear Collection
        </h2>

        <h3 className="text-base sm:text-lg md:text-xl font-serif text-center mb-6 text-[#af8314ff] max-w-3xl mx-auto">
          Elegant, comfortable office wear designed to keep you confident and professional every day.
        </h3>

        {/* ✅ Responsive grid (same logic as NewArrival) */}
        <div className="
          grid
          grid-cols-1
          min-[540px]:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
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

      <Footer />
    </div>
  );
};

export default OfficeWear;
