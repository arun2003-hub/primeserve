import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute: React.FC = () => {
  // 👇 Check for JWT token instead of local boolean flag
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return <Outlet />;
};
  
export default AdminRoute;