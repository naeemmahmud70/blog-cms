import React from "react";
import { useLocation } from "react-router-dom";

import "./Header.css";
import Profile from "./Profile";

const Header = () => {
  const location = useLocation();
  const pageTitles = {
    blogs: "Published Blogs",
    write_new_blog: "Write New Blog",
    drafts: "Saved Drafts",
    archives: "Archived Blogs",
    admins_list: "Admins List",
  };

  const segments = location.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";
  const prev = segments[segments.length - 2] || "";

  const formatTitle = (str) =>
    str.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Detect edit routes automatically
  const detectEditTitle = (str) => {
    if (str.toLowerCase().includes("edit")) {
      const base = str.replace(/[_-]?edit/i, "").trim();
      return `Edit ${formatTitle(base)}`;
    }
    return null;
  };

  // Detect if a segment looks like a dynamic ID (not in mapping and not "edit")
  const isDynamicParam = (str) => {
    return (
      !pageTitles[str] && !str.toLowerCase().includes("edit") && str !== ""
    );
  };

  let pageTitle = "";

  if (pageTitles[last]) {
    pageTitle = pageTitles[last];
  } else if (detectEditTitle(last)) {
    pageTitle = detectEditTitle(last);
  } else if (pageTitles[prev] && isDynamicParam(last)) {
    pageTitle = formatTitle(last);
  } else if (pageTitles[prev]) {
    pageTitle = pageTitles[prev];
  } else if (detectEditTitle(prev)) {
    pageTitle = detectEditTitle(prev);
  } else if (isDynamicParam(last)) {
    pageTitle = formatTitle(last);
  } else {
    pageTitle = formatTitle(prev);
  }
  return (
    <>
      <header className="bg-white header-styles sticky-top top-0 z-2 px-4 py-3 d-flex justify-content-between align-items-center">
        <h4 className="fw-normal m-0 font-poppins light-black-text">
          {pageTitle}
        </h4>
        <div className="d-none d-md-block">
          <Profile />
        </div>
      </header>
    </>
  );
};

export default Header;
