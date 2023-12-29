import type { Cookies } from '@sveltejs/kit'
import { jwtDecode } from 'jwt-decode';

export function setSessionCookie({ sessionData, cookies }: { sessionData: object, cookies: Cookies }) {
    try {
        cookies.set('auth_token', JSON.stringify(sessionData), {
            httpOnly: false, secure: false,
            path: '/'
        });
        return { data: "success", error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error: error.message ?? error };
    }
}

export function removeSessionCookie(cookies: Cookies) {
    try {
        cookies.delete('auth_token', {
            httpOnly: true, secure: true,
            path: '', maxAge: 0
        });
        return { data: "success", error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error: error.message ?? error };
    }
}

export function hasTokenExpired(token: string) {
    try {
        const decodedToken = jwtDecode(token);
        const dateNow = new Date();
        if ((decodedToken?.exp ?? 0) * 1000 < dateNow.getTime()) {
            return true;
        }
        return false;
    } catch (error) {
        return null;
    }
}