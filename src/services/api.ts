import axios, { AxiosInstance } from "axios";
import { signOutUser } from "./UserService";

const baseUrl = process.env.VUE_APP_BASE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": baseUrl,
  },
});

api.interceptors.request.use(
  (config) => {
    const data = JSON.parse(localStorage.getItem("vuex") || "{}");
    if (data?.user?.access_token) {
      config.headers.Authorization = "Bearer " + data.user.access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      signOutUser();
      return Promise.reject("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
