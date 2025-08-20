import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-5">Checking access...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role && role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
