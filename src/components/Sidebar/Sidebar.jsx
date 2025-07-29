import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import blog from "../../assets/icon/blog.png";
import write from "../../assets/icon/write.png";
import draft from "../../assets/icon/draft.png";
import archive from "../../assets/icon/archive.png";
import admins from "../../assets/icon/setting.png";

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
      link: "/admin/blogs/write_new_blog",
      icon: write,
    },
    {
      id: 3,
      title: "Drafts",
      link: "/admin/blogs/drafts",
      icon: draft,
    },
    {
      id: 1,
      title: "Archives",
      link: "/admin/blogs/archives",
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
    <div
      style={{ minWidth: "200px", background: "#c0c0c019" }}
      className="px-4 py-3"
    >
      <div className="d-flex align-items-center gap-2">
        <img src={logo} height={45} width={25} alt="" />
        <h2 className="font-mulish m-0">BAAI</h2>
      </div>
      <div className="d-flex flex-column gap-3 mt-4">
        {data.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="text-dark text-decoration-none font-nunito d-flex gap-2"
          >
            <img src={item.icon} alt="" width={25} />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
