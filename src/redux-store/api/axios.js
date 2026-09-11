import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosApi = axios.create({
    baseURL: API_BASE_URL,
});

// Request Interceptor
axiosApi.interceptors.request.use(
    (config) => {
        try {
            const persistedRoot = localStorage.getItem("persist:root");

            if (persistedRoot) {
                const parsedRoot = JSON.parse(persistedRoot);
                const auth = parsedRoot?.auth
                    ? JSON.parse(parsedRoot.auth)
                    : null;

                const token = auth?.userInfo?.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (error) {
            console.error("Failed to read auth token:", error);
        }


        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosApi.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response?.status === 401) {
            // Handle expired/invalid token
            // Example:
            // localStorage.removeItem("userInfo");
            // window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosApi;