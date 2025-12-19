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

      const hiddenItems =
        JSON.parse(localStorage.getItem("hiddenTopWear")) || [];
      const visibleItems = res.data.filter(
        (item) => !hiddenItems.includes(item.id)
      );

      setTopWearItems(visibleItems);
    } catch (err) {
      console.error("Error loading Top Wear items:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      {/* ✅ Navbar spacer */}
      <div className="h-[76px] md:h-[72px]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-[#023545]">
          TopWear Collection
        </h2>

        <h3 className="text-base sm:text-lg md:text-xl font-serif text-center mb-6 text-[#af8314ff] max-w-3xl mx-auto">
          Trendy and comfortable tops and t shirts designed to suit every style and occasion.
        </h3>

        {/* ✅ Responsive grid */}
        <div className="
          grid
          grid-cols-1
          min-[540px]:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {topWearItems.map((item) => (
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

      <Footer />
    </div>
  );
};

export default TopWear;
