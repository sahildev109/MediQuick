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
    <div className="w-72 h-screen bg-[#03045E] p-4 md:p-5 sticky top-0">
      <div className="bg-[#CAF0F8] border border-[#90E0EF] rounded-2xl p-4 shadow-2xl h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-[#03045E] tracking-tight">Admin Panel</h2>

      <div className="rounded-2xl border border-[#90E0EF] bg-linear-to-br from-white to-[#CAF0F8] p-4 mb-5 flex justify-center shadow-md">
        <img src="/newLogo.jpeg" className="h-24 w-auto rounded-xl border border-[#90E0EF] shadow-sm" />
      </div>

      <nav className="space-y-4 flex-1">
        <SidebarLink to="/admin" icon={<FaTachometerAlt />} text="Dashboard" />
        <SidebarLink to="/admin/inventory" icon={<FaBox />} text="Inventory" />
        <SidebarLink to="/admin/orders" icon={<FaClipboardList />} text="Orders" />
        <SidebarLink to="/admin/add-medicine" icon={<FaPlus />} text="Add Medicine" />
      </nav>

      <button className="mt-6 w-full bg-[#b60000] text-white px-4 py-3 rounded-xl hover:bg-[#d80000] transition-colors font-semibold shadow-md"
        onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-[#90E0EF] text-[#03045E] font-semibold hover:bg-white transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
