import React, { useState } from "react";
import "./App.css";
import AppRouter from "./router/Router";
import { ToastContainer } from "react-toastify";
import { LoginContext, LoadingContext } from "./context/LoadingContext";
import GlobalLoading from "./components/Loading/GlobalLoading";

function App() {
  const [loggedIndetails, setLoggedInDetails] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIndetails, setLoggedInDetails }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <AppRouter />
        {loading && <GlobalLoading />}
        <ToastContainer autoClose={2000} />
      </LoadingContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
