import Stripe from "stripe";
import { e as error, j as json } from "../../../../chunks/index.js";
import { p as private_env } from "../../../../chunks/shared-server.js";
import { d as db, p as posts } from "../../../../chunks/schema.js";
import { eq } from "drizzle-orm";
const stripe = new Stripe(private_env.STRIPE_SECRET_KEY);
async function POST({ request }) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, private_env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("Webhook signature failed", err);
    throw error(400, "invalid request");
  }
  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    db.update(posts).set({ state: "paid" }).where(eq(posts.post_id, Number(charge.metadata.post)));
  }
  return json(200);
}
export {
  POST
};
