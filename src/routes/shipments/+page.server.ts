import { db } from "../../index";
import type { Actions, PageServerLoad } from "./$types";
import type { Location, Post } from "$lib/types";
import { posts } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = (async ({ cookies }) => {
    const currentPosts = await db.select().from(posts);
    for (const p of currentPosts) {
        if (p.associatedPosts === null)
            currentPosts.splice(currentPosts.indexOf(p), 1);
    }
    currentPosts.sort((a: Post, b: Post) => b.boosts - a.boosts);
    console.log(currentPosts);
    return {
        currentUser: (await loadSession(cookies)),
        posts: currentPosts,
    };
})

export const actions = {
    default: async ({ request, url }) => {
        console.log(url.origin);
        const data = await request.formData();

        let price: number;
        let bp: number = 0;

        {
            const w = (data.get("weight") as unknown) as number;
            if (w < 5) {
                price = 125;
            } else if ( 5 <= w && w < 10) {
                price = 195;
            } else if ( 10 <= w && w < 20) {
                price = 255;
            } else {
                price = 300;
            }
        }
        {
            const typeBp = (data.get("bp") as unknown) as string;
            bp = (typeBp === "bp_const" ? price / 4 : Number(data.get("value")) * 0.1);
        }

        const startLocation: Location = {
            city: data.get("start_city") as string,
            postalCode: data.get("start_pcode") as string,
            adress: data.get("start_adress") as string,
        }
        const endLocation: Location = {
            city: data.get("end_city") as string,
            postalCode: data.get("end_pcode") as string,
            adress: data.get("end_adress") as string,
        }

        const timestamp = Date.now();

        await db.insert(posts).values({
            owner: data.get("user") as string,
            post_id: timestamp,
            title: data.get("title") as string,
            price: price,
            bp: bp,
            description: data.get("description") as string,
            startLocation: startLocation,
            endLocation: endLocation,
            // Means that it is not a master post
            associatedPosts: null,
        })

        const parent = (await db
            .select()
            .from(posts)
            .where(eq(posts.post_id, Number(data.get("parent_post_id")))))[0];
        
        let associated = parent.associatedPosts!;
        associated.push(timestamp);

        await db.update(posts).set({ associatedPosts: associated }).where(eq(posts.post_id, parent.post_id));
    }
};
