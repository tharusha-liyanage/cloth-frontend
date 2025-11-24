// src/Pages/CartPage.jsx
import React from "react";
import { useCart } from "../../contexts/CartContext";

const CartPage = () => {
  const { items, updateQty, removeItem, subtotal } = useCart();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {items.map((it) => (
              <div key={`${it.id}-${it.size}`} className="flex gap-6 items-center border-b py-6">
                <img src={it.imageUrl} alt={it.clothName} className="w-28 h-28 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-bold">{it.clothName}</p>
                  <p className="text-sm text-gray-600">Size: {it.size}</p>
                </div>

                <div className="w-32 text-center">
                  <p className="font-semibold">Rs {it.price.toLocaleString()}</p>
                </div>

                <div className="w-40">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(it.id, it.size, Math.max(1, it.qty - 1))} className="w-8 h-8 border grid place-items-center">−</button>
                    <input type="number" value={it.qty} onChange={(e) => updateQty(it.id, it.size, Math.max(1, Number(e.target.value || 1)))} className="w-16 text-center border rounded py-1" />
                    <button onClick={() => updateQty(it.id, it.size, it.qty + 1)} className="w-8 h-8 border grid place-items-center">+</button>
                  </div>
                </div>

                <div className="w-40 text-right font-bold">
                  Rs {(it.price * it.qty).toLocaleString()}
                </div>

                <div className="w-12 text-right">
                  <button onClick={() => removeItem(it.id, it.size)} className="text-red-600">✕</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-1/3 bg-white p-6 border rounded">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">Rs {subtotal.toLocaleString()}</span>
              </div>
              <button className="w-full bg-[#023545] text-white py-3 rounded">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
