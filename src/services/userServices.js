import apiClient from "./axiosInterceptor";
const basr_url = import.meta.env.VITE_BASE_URL;

export const setUserDetails = (details) => {
  return localStorage.setItem("loginAccessToken", JSON.stringify(details));
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("loginAccessToken"));
};

export const postBlog = async (data) => {
  return apiClient.post(basr_url + `/allBlogs`, data).then((res) => res);
};

export const getAllBlogs = async () => {
  return apiClient.get(basr_url + `/getallBlogs`).then((res) => res);
};

export const setDraft = async (data) => {
  return apiClient.post(basr_url + `/addDraft`, data).then((res) => res);
};
