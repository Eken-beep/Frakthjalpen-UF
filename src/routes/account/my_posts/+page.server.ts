import type { Post } from "$lib/types";
import { fail } from "@sveltejs/kit";
import { db } from "./../../../index";
import { eq } from "drizzle-orm";
import { posts } from "$lib/server/db/schema";

export { load } from "../loadUser";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        // This is actually horrible
        // Use this interim object to check for nulls, who cares
        const postSkeleton = {
            owner: data.get("owner"),
            title: data.get("title"),
            description: data.get("description"),
            price: data.get("price"),
            bp: data.get("bp"),
            start_adress: data.get("start_adress"),
            start_pcode: data.get("start_pcode"),
            start_city: data.get("start_city"),
            end_adress: data.get("end_adress"),
            end_pcode: data.get("end_pcode"),
            end_city: data.get("end_city"),
            post_id: data.get("post_id"),
            interestedUsers: data.get("interestedUsers"),
            state: data.get("state"),
        }

        for(const field in postSkeleton) {
            if (field === null || field === '')
                return fail(400, { ...postSkeleton, missing: true, success: false });
        }

        const interestedUsersStr = postSkeleton.interestedUsers! as string;

        // Could also be done by only updating the relevant values
        // I realize that would be way prettier too
        // But I'm invested into this solution now
        const newPost = {
            owner: postSkeleton.owner! as string,
            title: postSkeleton.title! as string,
            description: postSkeleton.description! as string,
            price: Number(postSkeleton.price! as string),
            bp: Number(postSkeleton.bp! as string),
            startLocation: {
                adress: postSkeleton.start_adress! as string,
                postalCode: postSkeleton.start_pcode! as string,
                city: postSkeleton.start_city! as string,
            },
            endLocation: {
                adress: postSkeleton.end_adress! as string,
                postalCode: postSkeleton.end_pcode! as string,
                city: postSkeleton.end_city! as string,
            },
            post_id: Number(postSkeleton.post_id! as string),
            interestedUsers:
                (interestedUsersStr === "null" ? null : JSON.parse(interestedUsersStr)),
            state: postSkeleton.state! as string,

        }

        await db
            .update(posts)
            .set({
                title: newPost.title,
                description: newPost.description,
                startLocation: newPost.startLocation,
                endLocation: newPost.endLocation,
            })
            .where(eq(posts.post_id, newPost.post_id));

        return { success: true };
    }
};
