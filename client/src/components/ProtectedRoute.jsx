import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute() {
  const user = getUser();

  // ❌ Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow route
  return <Outlet />;
}
