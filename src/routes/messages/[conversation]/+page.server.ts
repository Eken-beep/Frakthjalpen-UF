import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Message, Conversation } from "$lib/types";
import { db } from "./../../../index";
import { eq } from "drizzle-orm";
import { messages, posts } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";
import { createPaymentSession } from "$lib/server/pay";

export const load: PageServerLoad = async ({ params, cookies }) => {
    const cid = Number(params.conversation);
    const conversation = await db.select().from(messages).where(eq(messages.conversation_id, cid));
    const currentUser = await loadSession(cookies);

    if (conversation.length !== 1 || currentUser === undefined) {
        error(404, 'Not Found');
    }

    return {
        conversation: conversation,
        currentUser: currentUser,
    }
}

export const actions = {
    send: async (event) => {
        const data = await event.request.formData();
        const sender = await loadSession(event.cookies);
        if (sender === null) {
            return;
        }

        const text = data.get("textmessage");
        if (text === null) {
            return {
                missing: true,
            };
        } else if (text === "" || text === " ") {
            return {
                missing: true,
            }
        }

        const conversation = await db
            .select()
            .from(messages)
            .where(eq(messages.conversation_id, Number(event.params.conversation)));

        let allMessages: Message[] | null = conversation[0].messages;

        if (allMessages === null) {
            allMessages = [];
        }
        allMessages.push({
            sender: sender.id,
            text: text as string,
            read: false,
        });

        await db
            .update(messages)
            .set({ messages: allMessages })
            .where(eq(messages.conversation_id, conversation[0].conversation_id));
    },
    modify: async(event) => {
        const data = await event.request.formData();
        if (data.get("complete") !== null) {
            const currentUser = await loadSession(event.cookies);
            if (currentUser === null) return;

            const post_id: number = (await db
                .select()
                .from(messages)
                .where(eq(messages.conversation_id, Number(event.params.conversation))))[0].post_id!;
            const post = await db
                .select()
                .from(posts)
                .where(eq(posts.post_id, post_id));

            // We just quit if already paid
            if (post[0].state === "paid" || post[0].state === "done") return;

            if (currentUser.id !== post[0].owner) {
                await db.update(posts).set({state: "waiting"}).where(eq(posts.post_id, post_id));
            } else if (post[0].state === "waiting"){
                const url = event.url.origin;

                await createPaymentSession(post[0], currentUser, url);

            }
        } else {
            const cid = Number(event.params.conversation);
            const deleted = await db
                .delete(messages)
                .where(eq(messages.conversation_id, cid))
                .returning();
            const post_id = deleted[0].post_id;
            const post = await db
                .select()
                .from(posts)
                .where(eq(posts.post_id, post_id!));
            let interestedUsers_new: string[] = [];
            if (post[0].interestedUsers === null) return;
            for (let i = 0; i < post[0].interestedUsers.length; i++) {
                if (post[0].interestedUsers[i] !== deleted[0].user_a &&
                    post[0].interestedUsers[i] !== deleted[0].user_b)
                    interestedUsers_new.push(post[0].interestedUsers[i]);
            }
            console.log(interestedUsers_new);

            db.update(posts)
                .set({ interestedUsers: interestedUsers_new })
                .where(eq(posts.post_id, post_id!));

            redirect(303, "/");
        }
    },
} satisfies Actions;
