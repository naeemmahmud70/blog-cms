import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserDetails } from "../services/userServices";

// eslint-disable-next-line react/prop-types
const RequireAuth = ({ children }) => {
  const data = getUserDetails();
  const location = useLocation();
  if (data?.user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
