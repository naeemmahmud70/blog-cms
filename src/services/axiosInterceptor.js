import axios from "axios";
import { getUserDetails } from "./userServices";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const user = getUserDetails();
    const accountId = user?.accountId;
    const token = user?.sessionToken;

    config.headers["accept"] = "application/json";
    if (accountId) {
      config.headers["x-access-user"] = accountId;
    }
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("loginAccessToken");
      return Promise.reject(error);
    }
    if (error.response?.status === 403) {
      localStorage.removeItem("loginAccessToken");
      return Promise.reject(error);
    }
    console.log(error);
    return Promise.reject(error);
  }
);
export default apiClient;
