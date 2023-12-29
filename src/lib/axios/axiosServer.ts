import axios from 'axios';
import { auth_urls } from '$lib/config/url'
import type { Cookies } from '@sveltejs/kit';

/**
 * Axios instance for the server
 * withCredentials is set to true so that the cookie is sent with the request
 * The interceptor append the token to the request on every server request
 */


function createAxiosServerInstance(cookie?: Cookies) {
    const axiosInstance = axios.create({
        baseURL: auth_urls.BASEURL,
        withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (!cookie) return config;
            const authCookie = cookie.get('auth_token');
            try {
                const cookieData = authCookie ? JSON.parse(authCookie).token : null;
                config.headers.Authorization = `Bearer ${cookieData}`;
            } catch (error) {
                console.error('Failed to parse auth_token cookie:', error);
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    return axiosInstance;
}

export default createAxiosServerInstance;