import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import blog from "../../assets/icon/blog.png";
import write from "../../assets/icon/write.png";
import draft from "../../assets/icon/draft.png";
import archive from "../../assets/icon/archive.png";
import admins from "../../assets/icon/setting.png";
import "./Sidebar.css";
import Profile from "../Header/Profile";

const Sidebar = () => {
  const data = [
    {
      id: 1,
      title: "Blogs",
      link: "/admin/blogs",
      icon: blog,
    },
    {
      id: 2,
      title: "Write Blog",
      link: "/admin/write_new_blog",
      icon: write,
    },
    {
      id: 3,
      title: "Drafts",
      link: "/admin/drafts",
      icon: draft,
    },
    {
      id: 1,
      title: "Archives",
      link: "/admin/archives",
      icon: archive,
    },
    {
      id: 5,
      title: "Admins",
      link: "/admin/admins_list",
      icon: admins,
    },
  ];
  return (
    <div className="px-4 py-3 sticky-md-top sidebar-section">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img src={logo} height={45} width={25} alt="" />
          <h2 className="font-mulish m-0">BAAI</h2>
        </div>
        <div className="d-block d-md-none">
          <Profile />
        </div>
      </div>
      <div className="d-flex flex-column gap-3 mt-4">
        {data.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            end={item.customMatch} 
            className={({ isActive }) =>
              `text-dark text-decoration-none font-nunito d-flex gap-2 align-items-center px-2 py-1 ${
                isActive ? "active-link fw-medium" : ""
              }`
            }
          >
            <img src={item.icon} alt="" width={25} />
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
