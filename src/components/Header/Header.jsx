import React from "react";
import { useLocation } from "react-router-dom";
import profile from "../../assets/icon/user.png";
import downArrow from "../../assets/icon/down-arrow.png";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const pageTitles = {
    blogs: "Blog Home",
    archives: "Archived Blog",
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
        style={{ borderBottom: "2px solid #c0c0c077", boxShadow: "" }}
        className="bg-white px-4 py-3 d-flex justify-content-between"
      >
        <h3 className="fw-medium m-0 font-poppins">{pageTitle}</h3>

        <div className="dropdown ">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img width={32} src={profile} alt="" /> <span>Naeem Miah</span>
          </button>
          <div className="dropdown-menu profile-dropdown shadow">
            <p style={{ color: "" }}>naeem@braina.live</p>
            <button>Sign Out</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
