import { logoutUser } from '$lib/auth'
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
    await logoutUser(cookies)
    throw redirect(301, '/')
};