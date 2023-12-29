import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { auth_urls } from '$lib/config/url'
import { refreshToken } from '$lib/auth'
import Cookies from 'js-cookie';
import { browser } from '$app/environment';

/**
 * Axios instance for the client
 * withCredentials is set to true so that the cookie is sent with the request
 * The interceptors are used to check if the token has expired and if it has it will refresh it
 * and the other interceptor is used to add the token to the request
 */

const axiosInstance = axios.create({
    baseURL: auth_urls.BASEURL,
    withCredentials: true,
});


axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if (!browser) return
        if (error.response?.status === 403 && !originalRequest?._retry) {
            originalRequest._retry = true;
            try {
                const cookie = Cookies.get('auth_token');
                if (!cookie) return Promise.reject(error);
                const token = JSON.parse(cookie).token;
                const newToken = await refreshToken(token);
                if (!newToken) return Promise.reject('Failed to refresh token');
                Cookies.remove('auth_token');
                Cookies.set('auth_token', JSON.stringify(newToken), { path: '/' });
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken.data;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!browser) return config

        const authCookie = Cookies.get('auth_token');
        let token;
        try {
            token = authCookie ? JSON.parse(authCookie).token : null;
        } catch (error) {
            console.error('Failed to parse auth_token cookie:', error);
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
