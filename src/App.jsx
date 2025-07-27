import React from "react";
import "./App.css";
import AppRouter from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
