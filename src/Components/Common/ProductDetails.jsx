// src/Components/Common/ProductDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "../Header&Footer/Navbar.jsx";
import Footer from "../Header&Footer/Footer.jsx";
import img1 from "../../assets/size_chart.jpg";
// Cart Context
import { useCart } from "../../contexts/CartContext";

const API_URL = "http://localhost:8080/api/clothes/id/";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [showMiniCart, setShowMiniCart] = useState(false);

  // ⭐ NEW STATE
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const res = await axios.get(`${API_URL}${id}`);
    setItem(res.data);
  };

  if (!item)
    return <h2 className="text-center mt-20 text-xl">Loading...</h2>;

  const totalStock = Object.values(item.stockCount || {}).reduce(
    (a, b) => a + b,
    0
  );

  const currentStock = selectedSize ? item.stockCount[selectedSize] : 0;

  const progressWidth = selectedSize
    ? `${(currentStock / totalStock) * 100}%`
    : "0%";

  return (
    <div className="bg-[#fffff6ff]">
      <Navbar />

      <div className="max-w-6xl mx-auto bg-white grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-xl shadow-lg mt-20">

        {/* IMAGE */}
        <div>
          <img
            src={item.imageUrl}
            alt={item.clothName}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* DETAILS */}
        <div className="bg-white ">
          <h2 className="text-3xl font-bold mb-2">{item.clothName}</h2>

          <p className="text-2xl font-semibold text-gray-900 mb-4">
            Rs {item.price.toLocaleString()}
          </p>

          <p className="font-medium text-green-700">
            In Stock ({totalStock} items)
          </p>

          {/* SIZE SELECTOR */}
          <h3 className="font-bold mt-6 mb-2 text-lg">Select Size:</h3>

          <div className="flex gap-3 flex-wrap">
            {item.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setQty(1);
                }}
                className={`px-4 py-2 rounded border text-sm ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* STOCK BAR */}
          {selectedSize && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">
                {currentStock} units available in size {selectedSize}
              </p>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400"
                  style={{ width: progressWidth }}
                ></div>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-5">

            {/* ⭐ SIZE GUIDE BUTTON */}
            <button
              onClick={() => setShowSizeGuide(true)}
              className="border px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100"
            >
              📏 Size Guide
            </button>
          </div>

          {/* QUANTITY */}
          {selectedSize && (
            <div className="flex items-center gap-4 mt-6">
              <button
                disabled={qty <= 1}
                onClick={() => setQty(qty - 1)}
                className="px-3 py-1 border rounded bg-gray-100"
              >
                -
              </button>

              <span className="font-semibold text-lg">{qty}</span>

              <button
                disabled={qty >= currentStock}
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1 border rounded bg-gray-100"
              >
                +
              </button>
            </div>
          )}

          {/* ADD TO CART */}
          <button
            disabled={!selectedSize}
            onClick={() => {
              addItem({
                id: item.id,
                clothName: item.clothName,
                price: item.price,
                imageUrl: item.imageUrl,
                size: selectedSize,
                qty: qty,
              });

              setShowMiniCart(true);
              setTimeout(() => setShowMiniCart(false), 2500);
            }}
            className={`mt-6 w-full py-3 rounded-lg text-white font-bold text-lg ${
              selectedSize
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          {/* MINI CART */}
          {showMiniCart && (
            <div className="mt-3 text-sm text-green-700">
              Added to cart —
              <button
                onClick={() => navigate("/cart")}
                className="underline ml-1"
              >
                View cart
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* ⭐ SIZE GUIDE POPUP MODAL */}
      {showSizeGuide && (
        <div
          onClick={() => setShowSizeGuide(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full"
          >
            <h3 className="text-lg font-bold mb-3">Size Guide</h3>

            <img
              src={img1} // make sure file is inside public/
              alt="Size Chart"
              className="w-full rounded"
            />

            <button
              onClick={() => setShowSizeGuide(false)}
              className="mt-4 w-full py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
