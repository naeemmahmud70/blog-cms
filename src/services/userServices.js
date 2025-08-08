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

export const getAllDrafts = async () => {
  return apiClient.get(basr_url + `/getDrafts`).then((res) => res);
};
export const deleteDraft = async (id) => {
  return apiClient.delete(basr_url + `/delete/draft/${id}`).then((res) => res);
};

export const handleArchive = async (id) => {
  return apiClient.delete(basr_url + `/blog/delete/${id}`).then((res) => res);
};
export const postArchive = async (data) => {
  return apiClient.post(basr_url + `/addArchive`, data).then((res) => res);
};
