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
  // Get path segments
  const segments = location.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";
  const prev = segments[segments.length - 2] || "";

  // Format helper
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
    // Known static route
    pageTitle = pageTitles[last];
  } else if (detectEditTitle(last)) {
    // Edit route detected from last segment
    pageTitle = detectEditTitle(last);
  } else if (pageTitles[prev] && isDynamicParam(last)) {
    // Show the dynamic param as title instead of static mapping
    pageTitle = formatTitle(last);
  } else if (pageTitles[prev]) {
    // Known previous segment
    pageTitle = pageTitles[prev];
  } else if (detectEditTitle(prev)) {
    // Edit route detected from previous segment
    pageTitle = detectEditTitle(prev);
  } else if (isDynamicParam(last)) {
    // If last is just a dynamic param (fallback)
    pageTitle = formatTitle(last);
  } else {
    // Last fallback: format previous
    pageTitle = formatTitle(prev);
  }
  return (
    <>
      <header
        style={{ borderBottom: "2px solid #c0c0c077", boxShadow: "" }}
        className="bg-white px-4 py-3 d-flex justify-content-between align-items-center"
      >
        <h4 className="fw-medium m-0 font-poppins">{pageTitle}</h4>
        <div className="d-none d-md-block">
          <Profile />
        </div>
      </header>
    </>
  );
};

export default Header;
