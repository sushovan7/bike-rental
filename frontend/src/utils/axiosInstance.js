import axios from "axios";
import { store } from "../store/store";
import { setToken, logout } from "../features/auth/authSlice";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Axios Interceptor to refresh token
API.interceptors.response.use(
  (response) => response, // If the request is successful, return response
  async (error) => {
    console.log("❌ Axios Interceptor Triggered - Error:", error);
    const originalRequest = error.config;

    // If access token expired, refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        const { data } = await API.post("/auth/refresh-access-token"); // Refresh endpoint
        console.log("New Access Token:", data.accessToken);
        store.dispatch(setToken(data.accessToken));

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token Expired:", refreshError);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Attach Access Token to Requests
API.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default API;
