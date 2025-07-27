import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div   style={{ borderRight: "1px solid grey" }} className="p-4">
      <h1>Sidebar</h1>
      <ul>
        <li>
          <Link to="/admin/blogs">Blogs</Link>
        </li>
        <li>
          {" "}
          <Link to="/admin/blogs/archived">Archives</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
