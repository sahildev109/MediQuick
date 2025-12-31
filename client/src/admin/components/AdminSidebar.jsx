import { Link, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaClipboardList,
  FaPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import {  logoutAdmin } from "../../utils/auth";

export default function AdminSidebar() {
  const navigate=useNavigate();


  const handleLogout=()=>{
    try {
      logoutAdmin();
      navigate('/login')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-64 bg-[#307096] text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4">
        <SidebarLink to="/admin" icon={<FaTachometerAlt />} text="Dashboard" />
        <SidebarLink to="/admin/inventory" icon={<FaBox />} text="Inventory" />
        <SidebarLink to="/admin/orders" icon={<FaClipboardList />} text="Orders" />
        <SidebarLink to="/admin/add-medicine" icon={<FaPlus />} text="Add Medicine" />
      </nav>
      <img src="/public/logo.png" />
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        onClick={handleLogout}>
          Logout
        </button>
    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
