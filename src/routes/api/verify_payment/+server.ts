import Stripe from "stripe";
import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { db } from "../../../index";
import { eq } from "drizzle-orm";
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

    if (event.type === "charge.succeeded") {
        const charge = event.data.object;

        db
            .update(posts)
            .set({state: "paid"})
            .where(eq(posts.post_id, Number(charge.metadata.post)));
    }

    return json(200);
}
