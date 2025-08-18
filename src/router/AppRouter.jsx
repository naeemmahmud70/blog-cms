import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "../Auth/RequiredAuth";
import ProtectedRoutes from "./ProtectedRoutes";
import { CheckUserLogin } from "../Auth/CheckUserLogin";
import SignUpPage from "../pages/SignUpPage";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckUserLogin>
            {" "}
            <LoginPage />{" "}
          </CheckUserLogin>
        }
      />
      <Route
        path="/login"
        element={
          <CheckUserLogin>
            {" "}
            <LoginPage />{" "}
          </CheckUserLogin>
        }
      />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/admin/*"
        element={
          <RequireAuth>
            {" "}
            <ProtectedRoutes />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
