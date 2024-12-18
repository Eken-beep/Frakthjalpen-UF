import type { Post } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { Stripe } from "stripe";
import type { User } from "$lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const createPaymentSession = async (post: Post, user: User, url: string) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "SEK",
                    product_data: {
                        name: post.title,
                        description: post.description,
                    },
                    unit_amount_decimal: ((post.price + post.bp) * 100).toString(10),
                },
                quantity: 1,
            }
        ],
        customer_email: user.email,
        mode: "payment",
        success_url: url,
        metadata: {
            type: "post",
            requester: post.owner,
            carrier: user.id,
            post: post.post_id,
        },
        payment_intent_data: {
            metadata: {
                type: "post",
                requester: post.owner,
                carrier: user.id,
                post: post.post_id,
            },
        },
    });

    redirect(303, session.url!);
}

export const createPaymentSessionBoost = async (post: Post, user: User, url: string) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "SEK",
                    product_data: {
                        name: `Boosta "${post.title}"`,
                        description: "Boosta annonsen en gång för att synas bättre i flödet",
                    },
                    unit_amount_decimal: (29 * 100).toString(10),
                },
                quantity: 1,
            }
        ],
        customer_email: user.email,
        mode: "payment",
        success_url: url,
        metadata: {
            type: "boost",
            requester: post.owner,
            carrier: user.id,
            post: post.post_id,
        },
        payment_intent_data: {
            metadata: {
                type: "boost",
                requester: post.owner,
                carrier: user.id,
                post: post.post_id,
            },
        },
    });

    console.log(session);

    redirect(303, session.url!);
}
