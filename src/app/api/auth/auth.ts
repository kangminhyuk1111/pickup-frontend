import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = '/';

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // 쿠키를 주고받을 때 필요
});

export const authService = {
    login: async (credentials: { email: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);

        // 토큰을 쿠키에 저장
        Cookies.set('accessToken', response.data.accessToken, {
            expires: 1/24,  // 1일
            secure: process.env.NODE_ENV === 'production',  // HTTPS에서만 작동
            sameSite: 'strict'
        });

        Cookies.set('refreshToken', response.data.refreshToken, {
            expires: 7,  // 7일
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response.data;
    },

    getGoogleLoginUrl: () => {
        return `${BASE_URL}/oauth2/authorization/google`;
    },

    getKakaoLoginUrl: () => {
        return `${BASE_URL}/oauth2/authorization/kakao`;
    }
};