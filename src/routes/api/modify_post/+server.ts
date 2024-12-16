import { json, redirect } from "@sveltejs/kit";
import type { Post } from "$lib/types";
import { eq } from "drizzle-orm";
import { db } from "./../../../index";
import { posts } from "$lib/server/db/schema";
import { createPaymentSessionBoost } from "$lib/server/pay";
import { loadSession } from "$lib/server/account";

export async function POST({ request, cookies, url }) {
    let success = false;
    let stripeurl = "";
    const { action, post }:
        { action: string, post: Post }
        = await request.json();

    const user = await loadSession(cookies);
    if (user === null) return json({ success: false });

    if (action === "remove") {
        const delPost = await db.delete(posts).where(eq(posts.post_id, post.post_id)).returning();
        console.log("Deleted ", delPost);
        success = true;
    } else if (action === "boost") {
        await createPaymentSessionBoost(post, user, `${url.origin}/account/my_posts`);
        success = true;
    }

    return json({
        success: success,
        url: stripeurl,
    });
}
