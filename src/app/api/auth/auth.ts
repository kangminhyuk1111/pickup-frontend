import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        console.log('Request:', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            headers: config.headers
        });
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials: { email: string; password: string }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Login response:', response);

            if (response.data?.accessToken) {
                Cookies.set('accessToken', response.data.accessToken, {
                    expires: 1 / 24,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                Cookies.set('refreshToken', response.data.refreshToken, {
                    expires: 7,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
            }

            return response.data;
        } catch (error: any) {
            console.log(error)
            console.error('Login error:', error.response?.data || error);
            throw error;
        }
    },

    signup: async (signupForm: any) => {
        const response = await api.post("/member", signupForm);
        return response.data;
    }
};