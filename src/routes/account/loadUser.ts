import type { PageServerLoad } from "./$types";
import type { User } from "$lib/types";
import { loadSession } from "$lib/server/account";

// Default action for all pages under account
export const load: PageServerLoad = (async ({ cookies }) => {
    const currentUser: User | null = await loadSession(cookies);
    return {
        user: currentUser,
    };
}) satisfies PageServerLoad;
