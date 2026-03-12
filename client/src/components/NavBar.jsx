import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { getUser } from "../utils/auth";



export default function Navbar() {
const user=getUser()
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const syncCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      setCartCount(totalItems);
    } catch {
      setCartCount(0);
    }
  };

  syncCartCount();
  window.addEventListener("storage", syncCartCount);
  window.addEventListener("cart-updated", syncCartCount);

  return () => {
    window.removeEventListener("storage", syncCartCount);
    window.removeEventListener("cart-updated", syncCartCount);
  };
}, []);

  return (
    <div className="sticky top-0 z-50 bg-[#CAF0F8]/90 backdrop-blur-md shadow-xl px-4 md:px-10 lg:px-16 py-3 flex justify-between items-center border-b-4 border-[#0077B6]">
      <div className="flex gap-4 md:gap-6 justify-center items-center">
      <Link to="/customer-dashboard" className="text-2xl font-bold">
        <img src="/newLogo.jpeg" className="h-14 md:h-16 w-auto rounded-xl shadow-md border border-[#90E0EF]"></img>
      </Link>
      <p className="font-bold text-xl md:text-3xl" style={{color:'#03045E'}}>Hello, {user.name}</p>
</div>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6 bg-white/85 border border-[#90E0EF] rounded-2xl px-2 md:px-3 py-2 shadow-md">
        <Link to="/cart" className="flex items-center gap-2 text-base md:text-lg font-bold hover:bg-[#90E0EF]/40 px-3 py-2 rounded-xl transition-all duration-200">
    <p style={{color:'#03045E'}} >Cart</p>
          <FaShoppingCart size={22} color="#0077B6" />
          <span className="min-w-6 h-6 px-2 rounded-full bg-[#0077B6] text-white text-xs font-bold flex items-center justify-center">
            {cartCount}
          </span>
        </Link>
        <Link to="/orders" className="flex gap-2 items-center text-base md:text-lg font-bold hover:bg-[#90E0EF]/40 px-3 py-2 rounded-xl transition-all duration-200"><p style={{color:'#03045E'}} >Orders</p> <GiMedicines size={22} color="#0077B6"/></Link>
        <Link to="/profile" className="flex items-center gap-2 text-base md:text-lg font-bold hover:bg-[#90E0EF]/40 px-3 py-2 rounded-xl transition-all duration-200">
        <p style={{color:'#03045E'}}>Profile</p> 
          <FaUser size={22} color="#0077B6"/>
        </Link>
      </div>
    </div>
  );
}
