import axios from "axios";
import { getUserDetails } from "./userServices";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const user = getUserDetails();
    const token = user?.token; // make sure this matches your backend key

    config.headers["Accept"] = "application/json";

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("loginAccessToken"); 
    }
    console.error(error);
    return Promise.reject(error);
  }
);

export default apiClient;
