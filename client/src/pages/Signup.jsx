import { useState } from "react";
import LightPillar from "../components/LightPillar";
import { signupUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { googleLogin } from "../services/auth.service";


export default function Signup() {
  const [role, setRole] = useState("customer");
    const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });
const navigate=useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const res = await googleLogin({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });

    localStorage.setItem("user", JSON.stringify(res.user));

    if (!res.user.isProfileComplete) {
  navigate("/complete-profile");
} else {
  navigate("/customer-dashboard");
}

  } catch (error) {
    console.log(error);
    alert("Google login failed");
  }
};


   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signupUser(formData);
          // ✅ Remember user
    localStorage.setItem("user", JSON.stringify(res.user));
     // redirect
    navigate("/customer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen relative overflow-hidden">

      {/* 🔮 Animated Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
         topColor="#0077B6"
          bottomColor="#90E0EF"
          intensity={2.0}
          rotationSpeed={0.6}
          glowAmount={0.002}
          pillarWidth={5.0}
          pillarHeight={0.9}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>

      {/* 🧾 Signup Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

           <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-6 flex justify-center items-center flex-col mb-2 lg:mb-0">
            <h2 className="text-sm uppercase tracking-wide font-semibold text-center text-[#0077B6]">
              Join MediQuick
            </h2>
            <p className="text-2xl font-bold text-center mt-2" style={{color:'#03045E'}}>
              Create Account now  
            </p>
            <img src="/newLogo.jpeg" className="h-48 md:h-56 w-auto mt-4 rounded-xl border border-[#90E0EF]" />
            <p className="text-[#0077B6] text-sm mt-4 text-center">Get medicines delivered fast and securely.</p>
          </div>

          {/* Role Selection */}
          <div className="rounded-2xl border border-[#90E0EF] bg-white/70 p-5 md:p-6">
          <div className="flex gap-4 mb-4">
            {["customer"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg border transition ${
                  role === r
                    ? "text-white"
                    : "bg-white text-[#03045E]"
                }`}
                style={role === r ? { backgroundColor: "#0077B6" } : null}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            name="name"
              placeholder="Full Name"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              // value={formData.name}
              onChange={handleChange}
            />

            <select className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            name="gender"
              //  value={formData.gender}
              onChange={handleChange}>
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                //  value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                //  value={formData.email}
              onChange={handleChange}
            />

            <textarea
              placeholder="Address"
              name="address"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8] md:col-span-2"
                //  value={formData.address}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                //  value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
            
              placeholder="Confirm Password"
              className="p-3 border border-[#90E0EF] rounded-xl bg-white text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
                //  value={formData.confirmPassword}
              onChange={handleChange}
            />
          </form>

          <button
            className="mt-6 w-full text-white py-3 rounded-xl font-semibold hover:bg-[#00B4D8] transition-colors"
            style={{ backgroundColor: "#0077B6" }}
            onClick={handleSubmit}
            disabled={loading}
          >
           {loading ? "Signing up..." : "Sign Up"}
          </button>
  <button
  onClick={handleGoogleLogin}
  className="w-full mt-4 border border-[#90E0EF] bg-white flex items-center justify-center gap-3 py-3 rounded-xl hover:bg-[#CAF0F8] hover:cursor-pointer transition-colors"
>
  <img src="/google-logo.png" className="h-5" />
  Continue with Google
</button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#0077B6] font-medium">
              Login
            </a>    
          </p>
          </div>
          </div>
        </div>
      </div>

    </div>
  );
}
