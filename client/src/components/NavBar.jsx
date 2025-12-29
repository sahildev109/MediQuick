import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import Logo from '../assets/logo.png'
import { getUser } from "../utils/auth";



export default function Navbar() {
const user=getUser()

  return (
    <div className="bg-white/90 shadow-xl px-18  py-2  flex justify-between items-center border-4 border-cyan-600 rounded-lg " >
      <div className="flex gap-4 justify-center items-center">
      <Link to="/" className="text-2xl font-bold">
        <img src={Logo} className="h-25 w-50 rounded-2xl"></img>
      </Link>
      <p className="font-bold text-4xl" style={{color:'#1c3c71'}}>Hello, {user.name}</p>
</div>
      <div className="flex items-center gap-6">
        <Link to="/cart" className="flex items-center gap-2 text-lg font-bold hover:bg-cyan-100 rounded-md">
    <p style={{color:'#1c3c71'}} >Cart</p>
          <FaShoppingCart size={22} color="#467f95" />
        </Link>
        <Link to="/orders" className="flex gap-2 items-center text-lg font-bold hover:bg-cyan-100 rounded-md"><p style={{color:'#1c3c71'}} >Orders</p> <GiMedicines size={22} color="#467f95"/></Link>
        <Link to="/profile" className="flex items-center gap-2 text-lg font-bold hover:bg-cyan-100 rounded-md">
        <p style={{color:'#1c3c71'}}>Profile</p> 
          <FaUser size={22} color="#467f95"/>
        </Link>
      </div>
    </div>
  );
}
