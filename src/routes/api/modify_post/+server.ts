import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types";
import { eq } from "drizzle-orm";
import { db } from "./../../../index";
import { posts } from "$lib/server/db/schema";

export async function POST({ request }) {
    const { action, post_id }:
        { action: string, post_id: number }
        = await request.json();

    if (action === "remove") {
        db.delete(posts).where(eq(posts.post_id, post_id));
    }
}
