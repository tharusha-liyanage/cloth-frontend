// src/contexts/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // IMPORTANT: Ensure your useAuth provides the 'token'
  const { user, token } = useAuth ? useAuth() : { user: null, token: null };

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Helper to Log and Format Data
  const formatCartItems = (backendItems) => {
    console.log("Raw Backend Items:", backendItems); // <--- CHECK THIS LOG IN CONSOLE

    return backendItems.map((item) => {
      // SAFETY CHECK: If cloth is null, skip errors
      const cloth = item.cloth || {}; 

      return {
        // We use the CART ITEM ID for removal, not the cloth id
        id: item.cloth ? item.cloth.id : Math.random(), 
        itemId: item.id, 
        
        // Map Java fields to React fields
        // CHANGE 'clothName' to match your Cloth.java field (e.g., item.cloth.name)
        clothName: cloth.clothName || cloth.name || "Unknown Cloth", 
        
        // CHANGE 'imageUrl' to match your Cloth.java field
        imageUrl: cloth.imageUrl || cloth.image || "https://via.placeholder.com/150", 
        
        // CHANGE 'price' to match your Cloth.java field
        price: cloth.price || 0, 
        
        size: item.size,
        qty: item.quantity,
      };
    });
  };

  // 2. Fetch Cart on Load
  useEffect(() => {
    if (user && token) {
      fetchCartFromBackend();
    }
  }, [user, token]);

  const fetchCartFromBackend = async () => {
    setLoading(true);
    try {
      console.log("Fetching cart with token:", token);
      const response = await axios.get("http://localhost:8080/api/cart/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Backend Response:", response.data);

      if (response.data && response.data.items) {
        const formatted = formatCartItems(response.data.items);
        console.log("Formatted for Frontend:", formatted);
        setItems(formatted);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Add Item
  const addItem = async (newItem) => {
    if (!token) {
      alert("Please login first");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          clothId: newItem.id,
          size: newItem.size,
          quantity: newItem.qty || 1,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh cart after adding
      fetchCartFromBackend();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // 4. Remove Item
  const removeItem = async (clothId, size) => {
    // Find the specific item.itemId (Database ID) based on clothId and size
    const target = items.find((i) => i.id === clothId && i.size === size);
    
    if (!target || !target.itemId) {
        console.error("Cannot find item ID to delete");
        return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${target.itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartFromBackend(); // Refresh list
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 5. Update Qty (Simple version)
  const updateQty = (id, size, qty) => {
     // For now, this only updates local state to make UI responsive
     // You need a backend endpoint to persist this change!
     setItems(prev => prev.map(item => 
        item.id === id && item.size === size ? {...item, qty: qty} : item
     ));
  };

  const itemCount = items.reduce((s, it) => s + Number(it.qty || 0), 0);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  
  const clearCart = () => setItems([]); // Implement backend clear if needed

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};