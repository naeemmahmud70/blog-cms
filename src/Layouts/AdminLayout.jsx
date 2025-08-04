import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const AdminLayout = () => {
  return (
    <div className="d-block d-md-flex h-100">
      <Sidebar />
      <div className="flex-1 flex flex-col w-100">
        <Header />
        <main className="p-4 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
