import type { Actions, PageServerLoad } from "./$types";
import { loadSession } from "$lib/server/account";

export const load: PageServerLoad = (async ({ cookies }) => {
    const currentUser = await loadSession(cookies);
})
