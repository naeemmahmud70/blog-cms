import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { LoginContext } from "../context/LoadingContext";
import { getUserDetails } from "../services/userServices";

const AdminLayout = () => {
  const { setLoggedInDetails } = useContext(LoginContext);
  useEffect(() => {
    const userdetails = getUserDetails();
    if (userdetails?.user) {
      setLoggedInDetails(userdetails);
    }
  }, []);
  return (
    <div className="d-block d-md-flex h-100">
      <Sidebar />
      <div className="flex-1 flex flex-col w-100">
        <Header />
        <main className="p-3 p-lg-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
