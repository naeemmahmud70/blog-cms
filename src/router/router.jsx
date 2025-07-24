import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { ROUTES } from "./Routes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<HomePage />} />
      <Route path={ROUTES.home} element={<HomePage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
