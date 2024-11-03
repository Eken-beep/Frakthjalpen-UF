import { db } from "../../index";
import type { Actions, PageServerLoad } from "./$types";
import type { Location, Post } from "$lib/types";
import { posts } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";

export const load: PageServerLoad = (async ({ cookies }) => {
    const currentPosts = await db.select().from(posts);
    return {
        currentUser: (await loadSession(cookies)),
        posts: currentPosts,
    };
})
