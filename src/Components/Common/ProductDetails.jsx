// src/Pages/ProductDetails.jsx (update your existing file)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";

const API_URL = "http://localhost:8080/api/clothes/id/";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [showMiniCart, setShowMiniCart] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_URL}${id}`).then((res) => setItem(res.data)).catch(console.error);
  }, [id]);

  if (!item) return <div className="text-center mt-20">Loading...</div>;

  const totalStock = Object.values(item.stockCount || {}).reduce((a, b) => a + b, 0);
  const availableForSelectedSize = selectedSize ? (item.stockCount?.[selectedSize] ?? 0) : null;

  const canAdd = selectedSize && qty > 0 && availableForSelectedSize !== null && qty <= availableForSelectedSize;

  const handleAddToCart = () => {
    if (!canAdd) return;
    addItem({
      id: item.id,
      clothName: item.clothName,
      price: item.price,
      imageUrl: item.imageUrl,
      size: selectedSize,
      qty,
    });
    setShowMiniCart(true);
    // optionally open global sidebar: you could set a global state or use an event.
    // We'll use localStorage flag to trigger sidebar if your Navbar reads it, or better call a method via context.
    // For now just show a small confirmation:
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img src={item.imageUrl} alt={item.clothName} className="w-full rounded-lg shadow-lg" />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-3">{item.clothName}</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rs. {item.price.toLocaleString()}</h3>

        {totalStock <= 2 ? (
          <p className="text-red-500 font-semibold mb-3">Hurry! Only {totalStock} units left in stock!</p>
        ) : (
          <p className="text-green-600 font-semibold mb-3">In Stock</p>
        )}

        <h4 className="font-bold mt-6 mb-2">Size</h4>
        <div className="flex gap-3 flex-wrap">
          {item.sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                if (item.stockCount?.[size] && qty > item.stockCount[size]) {
                  setQty(item.stockCount[size]);
                }
              }}
              className={`px-4 py-2 rounded border ${
                selectedSize === size ? "bg-black text-white" : "bg-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Progress-like stock indicator */}
        {selectedSize && (
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Available</span>
              <span>{availableForSelectedSize} items</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
              <div
                className="h-2 bg-emerald-500"
                style={{
                  width: `${Math.min(100, ((availableForSelectedSize ?? 0) / 20) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-6 flex items-center gap-3">
          <label className="font-medium">Qty</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded border grid place-items-center"
            >
              −
            </button>
            <input
              type="number"
              className="w-20 text-center border rounded py-1"
              value={qty}
              min={1}
              max={availableForSelectedSize ?? 999}
              onChange={(e) => {
                const v = Math.max(1, Number(e.target.value || 1));
                setQty(v);
              }}
            />
            <button
              onClick={() => setQty(Math.min((availableForSelectedSize ?? 999), qty + 1))}
              className="w-8 h-8 rounded border grid place-items-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart button: visible only if size chosen and qty valid */}
        <div className="mt-6">
          {canAdd ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#023545] text-white py-3 rounded-lg font-semibold hover:opacity-90"
            >
              Add to Cart
            </button>
          ) : (
            <div className="w-full text-center">
              <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg">
                Select size & quantity
              </button>
            </div>
          )}
        </div>

        {/* small feedback */}
        {showMiniCart && (
          <div className="mt-3 text-sm text-green-700">
            Added to cart — <button onClick={() => navigate("/cart")} className="underline">View cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
