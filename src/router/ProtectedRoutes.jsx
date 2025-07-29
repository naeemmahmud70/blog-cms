import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogHome from "../pages/AdminPages/BlogHome";
import ArchivedBlogs from "../pages/AdminPages/ArchivedBlogs";
import AdminLayout from "../Layouts/AdminLayout";
import WriteNewBlog from "../pages/AdminPages/WriteNewBlog/WriteNewBlog";
import Drafts from "../pages/AdminPages/Drafts/Drafts";
import Admins from "../pages/AdminPages/Admins/Admins";
import DynamicBlog from "../pages/AdminPages/DynamicBlog/DynamicBlog";
import EditBlog from "../pages/AdminPages/EditBlog/EditBlog";
import EditDraft from "../pages/AdminPages/EditDraft/EditDraft";
import DynamicDraft from "../pages/AdminPages/DynamicDraft/DynamicDraft";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="blogs" element={<BlogHome />} />
        <Route path="blogs/:id" element={<DynamicBlog />} />
        <Route path="blogs/blog_edit/:id" element={<EditBlog />} />
        <Route path="blogs/archives" element={<ArchivedBlogs />} />
        <Route path="blogs/write_new_blog" element={<WriteNewBlog />} />
        <Route path="blogs/drafts" element={<Drafts />} />
        <Route path="blogs/drafts/:id" element={<DynamicDraft />} />
        <Route path="blogs/drafts/draft-edit/:id" element={<EditDraft />} />
        <Route path="admins_list" element={<Admins />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
