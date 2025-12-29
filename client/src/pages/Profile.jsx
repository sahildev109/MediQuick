import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";



export default function Profile() {

const navigate=useNavigate();
  const user=getUser()

  const handleLogout=()=>{
    try {
      logout();
      navigate('/login')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4 text-2xl font-bold" style={{color:"#1f3f75"}}>
        <div className="flex items-center gap-3">
          <FaUser color="#467f95" />
          <span >{user.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope color="#467f95" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
         <FaPhoneAlt color="#467f95"/>
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <CiLocationOn color="#467f95"/>
          <span>{user.address}</span>
        </div>

        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
