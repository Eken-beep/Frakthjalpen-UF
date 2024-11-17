import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { Message, Conversation } from "$lib/types";
import { db } from "./../../../index";
import { eq } from "drizzle-orm";
import { messages } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";

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
            console.log(event.params, "Slutför köp av frakt");
        } else {
            const cid = Number(event.params.conversation);
            const deleted = await db
                .delete(messages)
                .where(eq(messages.conversation_id, cid))
                .returning();
        }
    },
} satisfies Actions;
