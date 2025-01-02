import axios from 'axios';
import {getCookie} from 'cookies-next';
import {showLoginAlert} from "@/app/components/LoginAlert";

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await showLoginAlert();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;