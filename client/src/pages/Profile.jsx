import { useEffect, useRef, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/auth.service";



export default function Profile() {

const navigate=useNavigate();
  const user=getUser()
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 2200);
  };

  const handleLogout=()=>{
    try {
      logout();
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  const handlePasswordFieldChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showToast("All fields are required", "error");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New password and confirm password do not match", "error");
      return;
    }

    try {
      setIsChangingPassword(true);

      const res = await changePassword({
        userId: user.id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      showToast(res?.message || "Password changed successfully", "success");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to change password";
      if (message.toLowerCase().includes("incorrect current password")) {
        showToast("Incorrect current password", "error");
      } else {
        showToast(message, "error");
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03045E] p-6 md:p-8">
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-9999 px-4 py-2 rounded-lg text-white shadow-lg ${toastType === "error" ? "bg-[#b60000]" : "bg-[#0077B6]"}`}>
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">My Profile</h1>

      <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl" style={{color:"#03045E"}}>
        <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#90E0EF] border border-[#0077B6]/20 flex items-center justify-center shadow-sm">
              <FaUser color="#0077B6" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#0077B6]">Account</p>
              <p className="text-2xl md:text-3xl font-bold text-[#03045E] wrap-break-word">{user.name}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white/70 rounded-xl p-4 border border-[#90E0EF]">
            <div className="h-10 w-10 rounded-full bg-[#90E0EF] flex items-center justify-center shrink-0">
              <FaEnvelope color="#0077B6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Email</p>
              <span className="text-base md:text-lg font-semibold break-all">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/70 rounded-xl p-4 border border-[#90E0EF]">
            <div className="h-10 w-10 rounded-full bg-[#90E0EF] flex items-center justify-center shrink-0">
              <FaPhoneAlt color="#0077B6"/>
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Phone</p>
              <span className="text-base md:text-lg font-semibold">{user.phone}</span>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-4 bg-white/70 rounded-xl p-4 border border-[#90E0EF]">
            <div className="h-10 w-10 rounded-full bg-[#90E0EF] flex items-center justify-center shrink-0">
              <CiLocationOn color="#0077B6"/>
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Address</p>
              <span className="text-base md:text-lg font-semibold wrap-break-word">{user.address}</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full md:w-auto bg-[#b60000] text-white px-6 py-3 rounded-xl hover:bg-[#d80000] transition-colors font-semibold shadow-md"
        onClick={handleLogout}>
          Logout
        </button>

        <div className="mt-8 rounded-2xl border border-[#90E0EF] bg-white/70 p-5 md:p-6">
          <p className="text-sm font-medium text-[#0077B6]">Security</p>
          <h2 className="text-2xl font-bold text-[#03045E] mt-1">Change Password</h2>

          {!showPasswordForm ? (
            <button
              type="button"
              className="mt-5 w-full md:w-auto bg-[#0077B6] text-white px-6 py-3 rounded-xl hover:bg-[#00B4D8] transition-colors font-semibold shadow-md"
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </button>
          ) : (
          <form className="mt-5 space-y-4" onSubmit={handleChangePassword}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordFieldChange}
              className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] bg-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={handlePasswordFieldChange}
              className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] bg-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordFieldChange}
              className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] bg-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            />

            <button
              type="submit"
              disabled={isChangingPassword}
              className="w-full md:w-auto bg-[#0077B6] text-white px-6 py-3 rounded-xl hover:bg-[#00B4D8] transition-colors font-semibold shadow-md disabled:opacity-70"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>

            <button
              type="button"
              className="w-full md:w-auto md:ml-3 bg-[#90E0EF] text-[#03045E] px-6 py-3 rounded-xl hover:bg-[#CAF0F8] transition-colors font-semibold shadow-md"
              onClick={() => {
                setShowPasswordForm(false);
                setPasswordForm({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              Cancel
            </button>
          </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
