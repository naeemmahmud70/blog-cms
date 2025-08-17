import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserDetails } from "../services/userServices";

// eslint-disable-next-line react/prop-types
export const CheckUserLogin = ({ children }) => {
  const location = useLocation();
  const data = getUserDetails();
  if (data?.user?.role === "admin") {
    return <Navigate to="/admin/articles" state={{ path: location.pathname }} />;
  }
  return children;
};
