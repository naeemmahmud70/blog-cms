import React from "react";

const GlobalLoading = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3"
      style={{
        background: "linear-gradient(to left, #21212199, #29292999, #1c1c1c99)",
      }}
    >
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default GlobalLoading;
