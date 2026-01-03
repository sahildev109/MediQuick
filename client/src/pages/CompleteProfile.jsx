import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LightPillar from "../components/LightPillar";
import api from "../config/axios";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

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
      const res = await api.put("/auth/complete-profile", {
        userId: user.id,
        ...formData,
      });

      // update localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError("Failed to complete profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#467f95"
          bottomColor="#8fd3b7"
          intensity={2}
          rotationSpeed={0.5}
          glowAmount={0.002}
          pillarWidth={5}
          pillarHeight={0.9}
          interactive={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">
            Complete Your Profile
          </h2>

          <p className="text-sm text-gray-600 text-center mb-6">
            Just a few more details to get started
          </p>

          <form className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <textarea
              name="address"
              placeholder="Address"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
              required
            />

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full text-white py-3 rounded-lg"
              style={{ backgroundColor: "#467f95" }}
            >
              {loading ? "Saving..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
