import type { PageServerLoad } from "./$types";
import type { User, Post } from "$lib/types";
import { loadSession } from "$lib/server/account";
import { db } from "../../index";
import { eq, isNotNull } from "drizzle-orm";
import { posts } from "$lib/server/db/schema";

// Default action for all pages under account
export const load: PageServerLoad = (async ({ cookies }) => {
    const currentUser: User | null = await loadSession(cookies);
    if (currentUser === null) {
        return {
            user: currentUser,
            myPosts: null,
            savedPosts: null,
        };
    }
    const myPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.owner, currentUser.id));

    let allPostsInterestedUsers: Post[] = await db
        .select()
        .from(posts)
        .where(isNotNull(posts.interestedUsers));

    allPostsInterestedUsers.filter((value) => 
        value.interestedUsers!.includes(currentUser.id)
    )

    return {
        user: currentUser,
        myPosts: myPosts,
        savedPosts: allPostsInterestedUsers,
    }
}) satisfies PageServerLoad;
