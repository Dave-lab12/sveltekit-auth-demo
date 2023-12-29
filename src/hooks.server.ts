import { getSession, tokenRotation } from '$lib/auth'
import axiosServerInstance from '$lib/axios/axiosServer'
/**
 * Token rotation will check if the token has expired and if it has it will refresh it
 * axiosServerInstance will create an axios instance with the cookie
 * getSession will return data from the cookie
 */
export const handle = async ({ resolve, event }) => {
    await tokenRotation(event)
    event.locals.axiosServer = () => axiosServerInstance(event.cookies)
    event.locals.getSession = () => getSession(event.cookies)
    const response = await resolve(event);
    return response;
};
