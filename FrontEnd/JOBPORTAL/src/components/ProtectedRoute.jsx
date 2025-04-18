import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem("role"); // Get role from localStorage

  if (!role) {
    return <Navigate to="/login" replace />; // Redirect if role is undefined
  }

  // Check if allowedRoles contains only strings and if role is in allowedRoles
  if (!Array.isArray(allowedRoles) || !allowedRoles.every(item => typeof item === "string")) {
    console.error("allowedRoles should be an array of strings.");
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Redirect if role isn't allowed
  }

  return <Outlet />;
};

export default ProtectedRoute;
