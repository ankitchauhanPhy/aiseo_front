import axios from "axios";

// Load base URL from .env
const API_URL =  import.meta.env.VITE_API_ENV === "production" ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_LOCAL ;
// const API_URL = import.meta.env.VITE_API_URL_PROD;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (e.g., add token)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor (handle errors globally)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
