import Stripe from "stripe";
import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { db } from "../../../index";
import { eq, sql } from "drizzle-orm";
import { posts } from "$lib/server/db/schema";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST({ request }) {
    const body = await request.text();

    // If this is wrong we will get an error but no other things than stripe should call this endpoint and we should thus be fine
    const signature = request.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature!, env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.warn("Webhook signature failed", err);

        throw error(400, "invalid request");
    }

    console.log(event.data.object.object);

    if (event.type === "charge.succeeded") {
        const charge = event.data.object;

        switch(charge.metadata.type) {
            case "post":
                await db
                    .update(posts)
                    .set({state: "paid"})
                    .where(eq(posts.post_id, Number(charge.metadata.post)));
                break;
            case "boost":
                await db
                    .update(posts)
                    .set({ boosts: sql`${posts.boosts} + 1` })
                break;
            default:
                console.log("Invalid charge");
                break;
        }
    }

    return json(200);
}
