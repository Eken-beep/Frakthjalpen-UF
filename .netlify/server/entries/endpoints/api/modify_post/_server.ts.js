import { j as json } from "../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import { d as db, p as posts } from "../../../../chunks/schema.js";
import "../../../../chunks/pay.js";
async function POST({ request }) {
  let success = false;
  const { action, post } = await request.json();
  if (action === "remove") {
    const delPost = await db.delete(posts).where(eq(posts.post_id, post.post_id)).returning();
    console.log("Deleted ", delPost);
    success = true;
  } else if (action === "boost") {
    console.log("Inte inlagd funktion");
    success = false;
  }
  return json({
    success
  });
}
export {
  POST
};
