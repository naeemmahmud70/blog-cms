import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pageTitles = {
    blogs: "Blog Home",
    archived: "Archived Blog",
    users: "Users",
    edit: "Edit User",
  };
  // Extract the last segment from the pathname
  const segments = location.pathname.split("/").filter(Boolean);
  const currentPage = segments[segments.length - 1] || "";

  // Capitalize (optional)
  const pageTitle = pageTitles[currentPage] || "";
  return (
    <>
      <header
        style={{ borderBottom: "1px solid grey" }}
        className="bg-white p-4"
      >
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </header>
    </>
  );
};

export default Header;
