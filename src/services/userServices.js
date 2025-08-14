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

export const postArticle = async (data) => {
  return apiClient.post(basr_url + `/articles`, data).then((res) => res);
};

export const getAllArticles = async () => {
  return apiClient.get(basr_url + `/articles`).then((res) => res);
};

export const getDynamicArticle = async (title) => {
  return apiClient
    .get(`${basr_url}/articles/${encodeURIComponent(title)}`)
    .then((res) => res);
};

export const updateArticle = (id, fullArticleData) => {
  return apiClient
    .patch(basr_url + `/articles/${id}`, { updatedArticle: fullArticleData })
    .then((res) => res);
};

export const deleteArticle = async (id) => {
  return apiClient.delete(basr_url + `/articles/${id}`).then((res) => res);
};

export const setDraft = async (data) => {
  return apiClient.post(basr_url + `/drafts`, data).then((res) => res);
};

export const getAllDrafts = async () => {
  return apiClient.get(basr_url + `/drafts`).then((res) => res);
};

export const deleteDraft = async (id) => {
  return apiClient.delete(basr_url + `/drafts/${id}`).then((res) => res);
};

export const getDynamicDraft = async (title) => {
  return apiClient
    .get(`${basr_url}/drafts/${encodeURIComponent(title)}`)
    .then((res) => res);
};
export const updateDraft = (id, fullArticleData) => {
  return apiClient
    .patch(basr_url + `/drafts/${id}`, {
      updatedDraft: fullArticleData,
    })
    .then((res) => res);
};

export const postArchive = async (data) => {
  return apiClient.post(basr_url + `/archives`, data).then((res) => res);
};

export const getAllArchives = async () => {
  return apiClient.get(basr_url + `/archives`).then((res) => res);
};

export const deleteArchive = async (id) => {
  return apiClient.delete(basr_url + `/archives/${id}`).then((res) => res);
};
