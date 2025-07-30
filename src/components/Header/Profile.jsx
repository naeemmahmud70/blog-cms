import React from "react";
import profile from "../../assets/icon/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.dismiss();
    toast.success("Sign ou Successfully!");
    navigate("/login");
  };
  return (
    <div className="dropdown ">
      <button
        className="btn dropdown-toggle d-flex align-items-center gap-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img width={32} src={profile} alt="" />{" "}
        <span style={{ color: "#0C8AE6" }} className="d-none d-md-block">
          Naeem Miah
        </span>
      </button>
      <div className="dropdown-menu profile-dropdown shadow">
        <p style={{ color: "" }}>naeem@braina.live</p>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
