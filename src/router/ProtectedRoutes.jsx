import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogHome from "../pages/AdminPages/BlogHome";
import ArchivedBlogs from "../pages/AdminPages/ArchivedBlogs";
import AdminLayout from "../Layouts/AdminLayout";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="blogs" element={<BlogHome />} />
        <Route path="blogs/archives" element={<ArchivedBlogs />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
