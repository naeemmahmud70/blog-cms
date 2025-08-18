import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="d-flex flex-col align-items-center justify-content-center vh-100 text-center">
      <div>
        <h1 className="text-6xl font-bold m-0 font-archivo light-gray">404</h1>
        <p className="text-lg my-2 font-archivo light-black-text">
          Oops! The page you are looking for does not exist.
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <button
            onClick={() => navigate(-1)}
            className="border-0 w-25 py-2 px-3 rounded tex-base text-white fw-normal font-nunito blue-background"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="border-0 w-25 py-2 px-3 rounded tex-base text-white fw-normal font-nunito blue-background"
          >
            Go Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
