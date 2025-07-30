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
    <div className="dropdown">
      <button
        className="btn dropdown-toggle d-flex align-items-center gap-1"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img width={32} src={profile} alt="" />{" "}
        <span className="d-none d-md-block blue-text text-base font-nunito fw-noral m-0 ">
          Naeem Miah
        </span>
      </button>
      <div className="dropdown-menu profile-dropdown shadow p-3 text-center border-0">
        <p className="text-base font-nunito m-0">naeem@braina.live</p>
        <button
          onClick={handleLogout}
          className="border-0 blue-background text-white rounded py-1 px-2 w-100 text-base font-nunito mt-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
