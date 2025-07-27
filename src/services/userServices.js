export const setUserDetails = (details) => {
  return localStorage.setItem("loginAccessToken", JSON.stringify(details));
};

export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("loginAccessToken"));
};
