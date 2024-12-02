import { r as redirect } from "./index.js";
import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createPaymentSession = async (post, user, url) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "SEK",
          product_data: {
            name: post.title,
            description: post.description
          },
          unit_amount_decimal: (post.price * 100).toString(10)
        },
        quantity: 1
      }
    ],
    customer_email: user.email,
    mode: "payment",
    success_url: url,
    metadata: {
      requester: post.owner,
      carrier: user.id,
      post: post.post_id
    },
    payment_intent_data: {
      metadata: {
        requester: post.owner,
        carrier: user.id,
        post: post.post_id
      }
    }
  });
  redirect(303, session.url);
};
export {
  createPaymentSession as c
};
