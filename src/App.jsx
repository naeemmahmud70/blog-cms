import React, { createContext, useState } from "react";
import "./App.css";
import AppRouter from "./router/Router";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading/Loading";

export const LoadingContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <AppRouter />
      {loading && <Loading />}
      <ToastContainer autoClose={2000} />
    </LoadingContext.Provider>
  );
}

export default App;
