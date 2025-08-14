import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import ArticlesHome from "../pages/AdminPages/ArticlesHome/ArticlesHome";
import DynamicArticle from "../pages/AdminPages/DynamicArticle/DynamicArticle";
import EditArticle from "../pages/AdminPages/EditArticle/EditArticle";
import WriteNewArticle from "../pages/AdminPages/WriteNewArticle/WriteNewarticle";
import ArchivedArticles from "../pages/AdminPages/ArchivedArticles/ArchivedArticles";
import TaggedArticles from "../pages/AdminPages/TaggedArticles/TaggedArticles";
import Drafts from "../pages/AdminPages/Drafts/Drafts";
import DynamicDraft from "../pages/AdminPages/DynamicDraft/DynamicDraft";
import EditDraft from "../pages/AdminPages/EditDraft/EditDraft";
import Admins from "../pages/AdminPages/Admins/Admins";

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="articles" element={<ArticlesHome />} />
        <Route path="articles/:title" element={<DynamicArticle />} />
        <Route path="articles/article_edit/:title" element={<EditArticle />} />
        <Route path="articles/tag/:tag" element={<TaggedArticles />} />
        <Route path="write_new_article" element={<WriteNewArticle />} />
        <Route path="drafts" element={<Drafts />} />
        <Route path="drafts/:title" element={<DynamicDraft />} />
        <Route path="drafts/draft-edit/:title" element={<EditDraft />} />
        <Route path="archives" element={<ArchivedArticles />} />
        <Route path="admins_list" element={<Admins />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
