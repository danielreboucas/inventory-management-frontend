import axios, { AxiosInstance } from "axios";
import { authHeader } from "./UserService";
import router from "@/router";

const baseUrl = process.env.VUE_APP_BASE_API_URL;
export const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": process.env.VUE_APP_BASE_API_URL,
    Authorization: authHeader(),
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === "401") {
      localStorage.removeItem("user");
      router.push("/");
    }
  }
);

export default api;
