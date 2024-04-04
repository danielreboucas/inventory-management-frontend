import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.VUE_APP_BASE_API_URL;
export const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": process.env.VUE_APP_BASE_API_URL,
  },
});

export default api;
