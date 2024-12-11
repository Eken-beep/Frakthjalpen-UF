import { error, json } from "@sveltejs/kit";
import { db } from "./../../../index";
import { posts, messages } from "$lib/server/db/schema";
import { eq, or, and } from "drizzle-orm";

import type { Post, Conversation } from "$lib/types";

export async function POST({ request }) {
    const { post, user }: { post: Post, user: string } = await request.json();

    const conv = await db
        .select()
        .from(messages)
        .where(
            and(
                or(
                    and(
                        eq(messages.user_a, post.owner),
                        eq(messages.user_b, user),
                    ),
                    and(
                        eq(messages.user_a, user),
                        eq(messages.user_b, post.owner),
                    ),
                ),
                eq(messages.post_id, post.post_id),
            ),
        );

    console.log(conv);
    if (conv.length === 0) return json({ missing: true })

    return json({ missing: false, conversationId: conv[0].conversation_id });
}
