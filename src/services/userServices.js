import apiClient from "./axiosInterceptor";
const basr_url = import.meta.env.VITE_BASE_URL;

export const setUserDetails = (details) => {
  return localStorage.setItem("loginAccessToken", JSON.stringify(details));
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("loginAccessToken"));
};

export const signUpUser = async (data) => {
  return apiClient.post(basr_url + `/auth/signup`, data).then((res) => res);
};
export const loginUser = async (data) => {
  return apiClient.post(basr_url + `/auth/login`, data).then((res) => res);
};

export const postBlog = async (data) => {
  return apiClient.post(basr_url + `/articles`, data).then((res) => res);
};

export const getAllBlogs = async () => {
  return apiClient.get(basr_url + `/articles`).then((res) => res);
};

export const updateBlog = (id, fullBloglogData) => {
  return apiClient
    .patch(basr_url + `/articles/${id}`, { updatedArticle: fullBloglogData })
    .then((res) => res);
};

export const setDraft = async (data) => {
  return apiClient.post(basr_url + `/addDraft`, data).then((res) => res);
};

export const getDynamicBlog = async (title) => {
  return apiClient
    .get(`${basr_url}/articles/${encodeURIComponent(title)}`)
    .then((res) => res);
};

export const getAllDrafts = async () => {
  return apiClient.get(basr_url + `/getDrafts`).then((res) => res);
};
export const deleteDraft = async (id) => {
  return apiClient.delete(basr_url + `/delete/draft/${id}`).then((res) => res);
};
export const getDynamicDraft = async (title) => {
  return apiClient
    .get(`${basr_url}/draft/${encodeURIComponent(title)}`)
    .then((res) => res);
};
export const updateDraft = (id, fullBloglogData) => {
  return apiClient
    .patch(basr_url + `/updateDraftBlog/${id}`, {
      updatedDraft: fullBloglogData,
    })
    .then((res) => res);
};

export const getAllArchives = async () => {
  return apiClient.get(basr_url + `/getAllArchive`).then((res) => res);
};

export const handleArchive = async (id) => {
  return apiClient.delete(basr_url + `/articles/${id}`).then((res) => res);
};
export const postArchive = async (data) => {
  return apiClient.post(basr_url + `/addArchive`, data).then((res) => res);
};

export const deleteArchive = async (id) => {
  return apiClient
    .delete(basr_url + `/archive/delete/${id}`)
    .then((res) => res);
};
