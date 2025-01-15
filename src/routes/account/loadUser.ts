import type { PageServerLoad } from "./$types";
import type { User, Post } from "$lib/types";
import { loadSession } from "$lib/server/account";
import { db } from "../../index";
import { eq, isNotNull } from "drizzle-orm";
import { posts, journeys } from "$lib/server/db/schema";

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

    const allSavedPosts = allPostsInterestedUsers.filter((value) => 
        value.interestedUsers!.includes(currentUser.id)
    )

    const allJourneys = await db
        .select()
        .from(journeys)
        .where(eq(journeys.owner, currentUser.id))

    console.log(allSavedPosts)

    return {
        user: currentUser,
        myPosts: myPosts,
        savedPosts: (allSavedPosts.filter((post) => post.associatedPosts !== null)),
        savedAssociatedPosts: (allSavedPosts.filter((post) => post.associatedPosts === null)),
        myJourneys: allJourneys
    }
}) satisfies PageServerLoad;
