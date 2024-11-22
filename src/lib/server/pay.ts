import type { Post } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { db } from "../../index";
import { eq } from "drizzle-orm";
import { posts } from "$lib/server/db/schema";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const createPaymentSession = async (post: Post, forUser: string, url: string) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "SEK",
                    product_data: {
                        name: post.title,
                        description: post.description,
                        metadata: {
                            requester: post.owner,
                            carrier: forUser,
                        },
                    },
                    unit_amount_decimal: (post.price * 100).toString(10),
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: url,
    });

    await db.update(posts).set({ state: "payed"}).where(eq(posts.post_id, post.post_id));

    redirect(303, session.url!);
}
