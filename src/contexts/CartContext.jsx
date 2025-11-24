// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = (username) => `cart_${username || "guest"}`;

export const CartProvider = ({ children }) => {
  const { user } = useAuth ? useAuth() : { user: null };
  const username = user?.username || null;

  const [items, setItems] = useState([]);

  // load from localStorage on mount and when username changes
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY(username));
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    } else {
      setItems([]);
    }
  }, [username]);

  // persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY(username), JSON.stringify(items));
  }, [items, username]);

  const addItem = (item) => {
    // item: { id, clothName, price, imageUrl, size, qty }
    setItems((prev) => {
      // if same id & size exists, increase qty
      const existingIdx = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].qty = copy[existingIdx].qty + item.qty;
        return copy;
      } else {
        return [...prev, item];
      }
    });
  };

  const updateQty = (id, size, qty) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size ? { ...p, qty: Number(qty) } : p
      )
    );
  };

  const removeItem = (id, size) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((s, it) => s + Number(it.qty || 0), 0);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
