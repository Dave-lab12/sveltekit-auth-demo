import axios from "$lib/axios/axiosServer";
import { auth_urls } from "$lib/config/url"
import { isAxiosError } from "axios";
import type { Cookies } from "@sveltejs/kit";
import type { LoginParams } from "./types";
import type { RequestEvent } from '@sveltejs/kit'
import { removeSessionCookie, setSessionCookie, hasTokenExpired } from "./authHelpers";

type Event = RequestEvent<Partial<Record<string, string>>, string | null>;

export async function refreshToken(token: string) {
    try {
        const res = await axios().post(auth_urls.REFRESH_TOKEN, { token }, { withCredentials: true })
        if (res.status === 200) {
            return res.data
        }
        return null
    } catch (error) {
        return null
    }
}


export async function tokenRotation(event: Event) {
    const cookie = event.cookies
    const auth_cookie = cookie.get('auth_token')
    if (auth_cookie === 'null' || auth_cookie === 'undefined' || !auth_cookie) {
        removeSessionCookie(cookie)
        return null
    }
    try {
        const cookieData = JSON.parse(auth_cookie)
        const tokenStatus = hasTokenExpired(cookieData.token)
        if (!tokenStatus) return true
        const newToken = await refreshToken(cookieData.token)
        if (!newToken) return removeSessionCookie(cookie)

        removeSessionCookie(cookie)
        return setSessionCookie({ sessionData: newToken, cookies: cookie })
    } catch (error) {
        console.log(error)
        removeSessionCookie(cookie)
        return null
    }
}

export async function getSession(cookies: Cookies) {
    const cookieData = cookies.get('auth_token')
    if (!cookieData) return null
    return cookies.get('auth_token');
}


export async function loginUser({ email, password, otherData }: LoginParams) {
    try {
        const response = await axios().post(auth_urls.LOGIN, { username: email, password, ...otherData })
        if (response.status === 200) {
            return { data: response.data, error: null }
        }
        return { data: null, error: response.data }
    } catch (error) {
        if (isAxiosError(error)) {
            return { data: null, error: error.response?.data ?? error.message }
        }
        return { data: null, error: error.message ?? error }
    }
}

export async function logoutUser(cookies: Cookies) {
    cookies.delete('auth_token', { path: "/" })
}