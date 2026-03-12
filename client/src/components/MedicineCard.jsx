import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MedicineCard({ medicine }) {
  const medicineId = medicine._id ?? medicine.id;
  const [quantity, setQuantity] = useState(0);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const getCartItems = () => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  };

  const syncQuantityFromCart = () => {
    const existingCart = getCartItems();
    const existingItem = existingCart.find((item) => (item._id ?? item.id) === medicineId);
    setQuantity(existingItem?.qty || 0);
  };

  useEffect(() => {
    syncQuantityFromCart();

    window.addEventListener("cart-updated", syncQuantityFromCart);
    window.addEventListener("storage", syncQuantityFromCart);

    return () => {
      window.removeEventListener("cart-updated", syncQuantityFromCart);
      window.removeEventListener("storage", syncQuantityFromCart);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [medicineId]);

  const triggerAddedToast = () => {
    setShowAddedToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowAddedToast(false);
      toastTimeoutRef.current = null;
    }, 1600);
  };

  const updateCartQuantity = (nextQty) => {
    const existingCart = getCartItems();
    const alreadyInCart = existingCart.find((item) => (item._id ?? item.id) === medicineId);

    let updatedCart;

    if (nextQty <= 0) {
      updatedCart = existingCart.filter((item) => (item._id ?? item.id) !== medicineId);
    } else if (alreadyInCart) {
      updatedCart = existingCart.map((item) =>
        (item._id ?? item.id) === medicineId ? { ...item, qty: nextQty } : item
      );
    } else {
      updatedCart = [...existingCart, { ...medicine, qty: nextQty }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setQuantity(nextQty > 0 ? nextQty : 0);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleAddToCart = () => {
    updateCartQuantity(1);
    triggerAddedToast();
  };

  const handleIncrease = () => {
    updateCartQuantity(quantity + 1);
    triggerAddedToast();
  };

  const handleDecrease = () => {
    updateCartQuantity(quantity - 1);
  };

  return (
    <div className="relative bg-[#CAF0F8] border border-[#90E0EF] p-4 md:p-5 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full">
      {showAddedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#0077B6] text-white text-xs md:text-sm px-4 py-2 rounded-lg shadow-lg z-9999 whitespace-nowrap">
          {medicine.name} added to cart
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#90E0EF] p-3 flex items-center justify-center h-52 md:h-56 overflow-hidden">
        <img src={medicine.image} alt={medicine.name} className="h-full w-full object-contain" />
      </div>

      <h2 className="font-bold text-lg md:text-xl text-[#03045E] mt-4 leading-tight">{medicine.name}</h2>
      <p className="text-sm text-[#0077B6] mt-2 min-h-10">{medicine.description}</p>

      <div className="mt-4 pt-4 border-t border-[#90E0EF] flex items-center justify-between">
        <p className="text-[#03045E] text-xl font-bold">₹{medicine.price}</p>
      </div>

      {quantity === 0 ? (
        <button
          className="mt-4 w-full bg-[#0077B6] text-white py-2.5 rounded-xl hover:cursor-pointer hover:bg-[#00B4D8] transition-colors font-semibold"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-4 w-full bg-[#0077B6] text-white py-2.5 rounded-xl flex items-center justify-between px-4">
          <button
            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            <FaMinus size={12} />
          </button>

          <span className="font-bold text-lg">{quantity}</span>

          <button
            className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <FaPlus size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
