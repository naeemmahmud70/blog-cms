import React, { useContext } from "react";
import profile from "../../assets/icon/user.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../../context/LoadingContext";

const Profile = () => {
  const navigate = useNavigate();
  const { loggedIndetails } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.clear();
    toast.dismiss();
    toast.success("Sign out successfully!");
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
          {loggedIndetails?.user?.name}
        </span>
      </button>
      <div className="dropdown-menu profile-dropdown shadow p-3 text-center border-0">
        <p className="text-base font-nunito m-0">
          {" "}
          {loggedIndetails?.user?.email}
        </p>
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
