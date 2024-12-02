import { j as json } from "../../../../chunks/index.js";
import { eq } from "drizzle-orm";
import { d as db, a as accounts, s as sessions } from "../../../../chunks/schema.js";
async function POST({ request, cookies }) {
  const session_id = cookies.get("session_id");
  if (session_id === void 0) return json({ success: false });
  await db.select().from(accounts).where(eq(accounts.session_token, session_id));
  cookies.delete("session_id", { path: "/" });
  await db.delete(sessions).where(eq(sessions.session_token, session_id));
  return json({ success: true });
}
export {
  POST
};
