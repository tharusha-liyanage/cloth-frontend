// src/Components/Cart/CartSidebar.jsx
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

const CartSidebar = ({ open, onClose, onViewCart }) => {
  const { items, updateQty, removeItem, subtotal } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">MY BAG ({items.length})</h2>
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* CART ITEMS */}
      <div className="p-4 space-y-6 overflow-y-auto h-[70%]">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-3 border-b pb-4">
              <img
                src={item.imageUrl}
                alt={item.clothName}
                className="w-20 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.clothName}</h3>
                <p className="text-xs text-gray-500">Size: {item.size}</p>
                <p className="font-semibold mt-1">Rs {item.price.toLocaleString()}</p>

                {/* QUANTITY CONTROL */}
                <div className="flex items-center mt-2 border rounded w-24">
                  <button
                    className="flex-1 py-1 border-r"
                    onClick={() =>
                      updateQty(item.id, item.size, Math.max(1, item.qty - 1))
                    }
                  >
                    <Minus size={14} />
                  </button>

                  <span className="flex-1 text-center text-sm">{item.qty}</span>

                  <button
                    className="flex-1 py-1 border-l"
                    onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  className="text-xs text-red-600 mt-2"
                  onClick={() => removeItem(item.id, item.size)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium">SUBTOTAL</span>
            <span className="font-semibold">Rs {subtotal.toLocaleString()}</span>
          </div>

          <button
            onClick={onViewCart}
            className="w-full bg-black text-white py-2 rounded mb-2 hover:bg-gray-800"
          >
            PROCEED TO CHECKOUT
          </button>

          <button
            className="w-full border py-2 rounded hover:bg-gray-100"
            onClick={onViewCart}
          >
            VIEW SHOPPING BAG
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
