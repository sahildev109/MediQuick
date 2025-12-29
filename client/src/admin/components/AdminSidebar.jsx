import { Link } from "react-router-dom";
import {
  FaBox,
  FaClipboardList,
  FaPlus,
  FaTachometerAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-[#1c3c71] text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-4">
        <SidebarLink to="/admin" icon={<FaTachometerAlt />} text="Dashboard" />
        <SidebarLink to="/admin/inventory" icon={<FaBox />} text="Inventory" />
        <SidebarLink to="/admin/orders" icon={<FaClipboardList />} text="Orders" />
        <SidebarLink to="/admin/add-medicine" icon={<FaPlus />} text="Add Medicine" />
      </nav>
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
