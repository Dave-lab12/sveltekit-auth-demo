import type { Action, Actions, PageServerLoad } from './$types'
import { loginUser, setSessionCookie } from '$lib/auth'
import { redirect } from '@sveltejs/kit'
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


const login: Action = async ({ request, cookies }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    const loginData = await loginUser({ email: username, password, otherData: { login_with: "email_password" } })
    if (loginData.data) {
        setSessionCookie({ cookies, sessionData: loginData.data }) // set tge cookie that is returned from the server
    }
    if (loginData.data) {
        return redirect(301, '/')
    }

    return { status: 401, body: { success: false, message: loginData } };
}

export const actions: Actions = { login }
