import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ShoppingCart, EyeOff, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:8080/api/clothes/allcloth";

const NewArrivalCarousel = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchClothes();
  }, []);

  const handleNewArrivalpage = () => {
        navigate("/newArrival"); 
    };
  const fetchClothes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const deletedItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
      // Filter out hidden items
      const visibleItems = res.data.filter((item) => !deletedItems.includes(item.id));
      setClothes(visibleItems);
    } catch (error) {
      console.error("Error fetching clothes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHideItem = (id, e) => {
    e.stopPropagation(); // Prevent triggering card click
    const deletedItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
    localStorage.setItem("hiddenNewArrival", JSON.stringify([...deletedItems, id]));
    setClothes(clothes.filter((item) => item.id !== id));
  };

  // Scroll Logic
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300; // Width of card + gap
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 bg-gray-50 relative group/section -mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8  ">
          <div className="items-center justify-center text-center translate-x-120">
            <h2 className="text-3xl md:text-4xl font-bold text-[#604a03ff] mb-2 ">
              New Arrivals
            </h2>
            <p className="text-[#af8314ff] mt-1 text-xl">
              Check out the latest trends just in for the season.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#604a03ff] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#604a03ff] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar in Firefox/IE
        >
          {loading ? (
            // Loading Skeletons
            [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : clothes.length > 0 ? (
            clothes.map((item) => (
              <div 
                key={item.id}
                className="min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-[320px] overflow-hidden bg-gray-100">
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#023545] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    NEW
                  </span>

                  

                  <img
                    src={item.imageUrl}
                    alt={item.clothName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay Actions */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 px-4">
                    <button className="flex-1 bg-white text-black py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button className="p-2.5 bg-white text-black rounded-lg shadow-lg hover:text-red-500 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Category Name</p> {/* Replace if you have category in API */}
                  <h3 className="font-bold text-lg text-[#604a03ff] truncate">{item.clothName}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-[#023545]">Rs. {item.price}</span>
                    <div className="flex gap-1">
                        {/* Color swatches decoration (optional) */}
                        <div className="w-3 h-3 rounded-full bg-[#604a03ff]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#af8314ff]"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="w-full text-center py-10 text-gray-500">No new arrivals found.</div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 md:py-16">
    
    {/* Headline Text */}
    <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-6">
        Discover the newest collection,<br/>designed to keep your style up to date
    </p>

    {/* Button */}
    <button
        onClick={handleNewArrivalpage}
        className="
            bg-[#604a03ff] text-white 
            px-8 py-3 
            rounded-full               
            hover:bg-[#816404ff] 
            transition duration-300    
            font-semibold              
            shadow-xl                  
            tracking-wide             
        "
    >
        Explore more
    </button>
</div>

      </div>
    </section>
  );
};

// Skeleton Component for loading state
const SkeletonCard = () => (
  <div className="min-w-[280px] md:min-w-[300px] bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-[320px] bg-gray-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

export default NewArrivalCarousel;