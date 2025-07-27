import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { ROUTES } from "./Routes";
import RequireAuth from "../Auth/RequiredAuth";
import ProtectedRoutes from "./ProtectedRoutes";
import { CheckUserLogin } from "../Auth/CheckUserLogin";
import SignUpPage from "../pages/SignUpPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={
          <CheckUserLogin>
            {" "}
            <LoginPage />{" "}
          </CheckUserLogin>
        }
      />
      <Route
        path={ROUTES.login}
        element={
          <CheckUserLogin>
            {" "}
            <LoginPage />{" "}
          </CheckUserLogin>
        }
      />
      <Route path={ROUTES.signUp} element={<SignUpPage />} />
      <Route
        path="/admin/*"
        element={
          <RequireAuth>
            {" "}
            <ProtectedRoutes />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRouter;
