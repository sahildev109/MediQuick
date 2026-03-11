import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import CustomerDashboard from "./pages/CustomerDashboard";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/NavBar";
import ClickSpark from './components/ClickSpark';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AddMedicine from "./admin/pages/AddMedicine";
import Inventory from "./admin/pages/Inventory";
import AdminOrders from "./admin/pages/Orders";
import CompleteProfile from "./pages/CompleteProfile";

export default function App() {
   const location = useLocation();
     const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"||
    location.pathname==="/admin"||
    location.pathname==="/admin/add-medicine"||
    location.pathname==="/admin/inventory"||
    location.pathname==="/admin/orders"||
    location.pathname==="/complete-profile"

  return (
    <>
    <ClickSpark
     sparkColor='#1c3c71'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}>
         {!hideNavbar && <Navbar />}

      <Routes>
          {/* � Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile/>}/>

          {/* 🔒 Protected Customer Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 🔒 Admin Routes */}
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/add-medicine" element={<AddMedicine/>}/>
        <Route path="/admin/inventory" element={<Inventory/>}/>
        <Route path="/admin/orders" element={<AdminOrders/>}/>

      </Routes>
      </ClickSpark>
    </>
  );
}
