import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types";
import { eq } from "drizzle-orm";
import { db } from "./../../../index";
import { posts } from "$lib/server/db/schema";
import { } from "$lib/server/pay";

export async function POST({ request }) {
    let success = false;
    const { action, post }:
        { action: string, post: Post }
        = await request.json();

    if (action === "remove") {
        const delPost = await db.delete(posts).where(eq(posts.post_id, post.post_id)).returning();
        console.log("Deleted ", delPost);
        success = true;
    } else if (action === "boost") {
        console.log("Inte inlagd funktion");
        success = false;
    }

    return json({
        success: success,
    });
}
