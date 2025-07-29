import React from "react";
import profile from "../../assets/icon/user.png";

const Profile = () => {
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
        <button>Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
