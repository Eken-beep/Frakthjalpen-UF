import { db } from "../../index";
import type { Actions, PageServerLoad } from "./$types";
import type { Location, Post } from "$lib/types";
import { posts, journeys, users, messages } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = (async ({ cookies }) => {
    const currentPosts = await db.select().from(posts);
    console.log(currentPosts);
    for (const p of currentPosts) {
        if (p.associatedPosts === null)
            currentPosts.splice(currentPosts.indexOf(p), 1);
    }
    currentPosts.sort((a: Post, b: Post) => b.boosts - a.boosts);

    const allJourneys = await db.select().from(journeys);

    return {
        currentUser: (await loadSession(cookies)),
        posts: currentPosts,
        journeys: allJourneys,
    };
})

export const actions = {
    default: async ({ request, url }) => {
        console.log(url.origin);
        const data = await request.formData();

        const userId = data.get("user") as string;

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
        console.log(JSON.stringify(startLocation));

        const j = (await db
            .select()
            .from(journeys)
            .where(eq(journeys.id, Number(data.get("journey_id")))))[0];
        
        let associated = j.associatedPosts!;
        associated.push(timestamp);

        await db.update(journeys).set({ associatedPosts: associated }).where(eq(journeys.id, j.id));

        const owner = await db.select().from(users).where(eq(users.id, j.owner));

        const conversation_id = Date.now();

        await db.insert(messages).values({
            conversation_id: conversation_id,
            user_a: userId,
            user_b: owner[0].id,
            post_id: timestamp,
            messages: [
                {
                    text: `Hej, skulle du kunna ta mitt paket "${data.get("title")}" från ${startLocation.adress} till ${endLocation.adress} när du ändå svänger förbi?`,
                    sender: userId,
                    read: false,
                }
            ],
        });

        await addConversation(userId, conversation_id);
        await addConversation(owner[0].id, conversation_id)
    }
};

async function addConversation(userId: string, conversation_id: number) {
    const filter = eq(users.id, userId);
    const field = await db.select({
        active_conversations: users.active_conversations,
    }).from(users).where(filter);

    if (field[0].active_conversations !== null) {
        let newConversationList = field[0].active_conversations;
        newConversationList.push(conversation_id);

        await db.update(users).set(users.active_conversations).where(filter);
    }
}
