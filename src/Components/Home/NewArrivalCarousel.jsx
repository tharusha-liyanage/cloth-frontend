import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const API_URL = "http://localhost:8080/api/clothes/allcloth";

const NewArrivalCarousel = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addItem } = useCart();
  

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const deletedItems = JSON.parse(localStorage.getItem("hiddenNewArrival")) || [];
      const visibleItems = res.data.filter((item) => !deletedItems.includes(item.id));
      setClothes(visibleItems);
    } catch (error) {
      console.error("Error fetching clothes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewArrivalpage = () => {
    navigate("/newArrival");
  };

  const scroll = (direction) => {
    const scrollAmount = 330;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#604a03ff]">New Arrivals</h2>
            <p className="text-[#af8314ff] text-lg md:text-xl mt-1">
              Check out the latest trends just in for the season.
            </p>
          </div>

          {/* Arrow Buttons (Desktop only) */}
          <div className="hidden md:flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#604a03ff] hover:text-white transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-300 hover:bg-[#604a03ff] hover:text-white transition"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : clothes.length > 0 ? (
            clothes.map((item) => (
              <div
                key={item.id}
                className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] snap-start bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border border-gray-100 group"
              >
                {/* IMAGE */}
                <div className="relative h-[260px] sm:h-[300px] bg-gray-100 overflow-hidden">
                  <span className="absolute top-3 left-3 bg-[#023545] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    NEW
                  </span>

                  <img
                    src={item.imageUrl}
                    alt={item.clothName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* ADD TO CART BUTTON */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={async () => {
                        if (!item.sizes || item.sizes.length === 0) {
                          // No size available — go to product page so user can select
                          navigate(`/product/${item.id}`);
                          return;
                        }

                        const selectedSize = item.sizes[0];

                        try {
                          await addItem({ id: item.id, size: selectedSize, qty: 1 });
                        } catch (err) {
                          console.error("Add to cart failed:", err);
                        } finally {
                          // Redirect to product details so user sees the cloth details
                          navigate(`/product/${item.id}`);
                        }
                      }}
                      className="bg-white text-black py-2.5 w-full rounded-lg text-sm font-semibold shadow-lg hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                    Category Name
                  </p>
                  <h3 className="font-bold text-lg text-[#604a03ff] truncate">
                    {item.clothName}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-[#023545]">Rs. {item.price}</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#604a03ff]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#af8314ff]"></div>
                    </div>
                  </div>

                  {/* (No inline confirmation — user is redirected to product details) */}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-10 text-gray-500">No new arrivals found.</div>
          )}
        </div>

        {/* EXPLORE MORE SECTION */}
        <div className="text-center mt-10 md:mt-14">
          <p className="text-xl md:text-2xl text-gray-800 mb-4">
            Discover the newest collection,<br className="hidden sm:block" />
            designed to keep your style up to date
          </p>

          <button
            onClick={handleNewArrivalpage}
            className="bg-[#604a03ff] text-white px-8 py-3 rounded-full hover:bg-[#816404ff] transition font-semibold shadow-lg"
          >
            Explore more
          </button>
        </div>
      </div>
    </section>
  );
};

/* LOADING SKELETON */
const SkeletonCard = () => (
  <div className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-[260px] sm:h-[300px] bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

export default NewArrivalCarousel;
