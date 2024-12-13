import { json } from "@sveltejs/kit";
import { db } from "./../../../index";
import { eq, and } from "drizzle-orm";
import { posts } from "$lib/server/db/schema";

export async function POST({ request }) {
    const body = await request.json();

    const post_id = body.post_id;

    const post = await db.update(posts).set({ state: "done" }).where(
        and(
            eq(posts.post_id, post_id),
            eq(posts.state, "paid"),
        )
    ).returning();

    if (post.length !== 0) {
        return json(200);
    } else {
        return json(400);
    }
}
