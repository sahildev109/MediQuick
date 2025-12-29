import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Navbar from "./components/NavBar";
import ClickSpark from './components/ClickSpark';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./admin/pages/AdminDashboard";

export default function App() {
   const location = useLocation();
     const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";
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
          {/* 🔒 Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        </Route>

 {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/admin" element={<AdminDashboard/>}/>


      </Routes>
      </ClickSpark>
    </>
  );
}
