import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const session = await locals.getSession() ?? null;

    return { session };
}) satisfies LayoutServerLoad;