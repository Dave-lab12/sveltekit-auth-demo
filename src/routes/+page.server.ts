import type { PageServerLoad } from './$types';
/**
 * This tests if the authentication heder is been sent to the server
 */

export const load = (async ({ locals }) => {
    try {
        const data = await locals.axiosServer().get('') // your api endpoint that needs authentication
        console.log(data.data, "from the server")
    } catch (error) {
        console.log("error")
    }
    return {};
}) satisfies PageServerLoad;