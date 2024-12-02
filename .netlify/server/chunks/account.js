import bcrypt from "bcrypt";
import "./index.js";
import { d as db, s as sessions, u as users } from "./schema.js";
import { eq } from "drizzle-orm";
const saltRounds = 10;
async function loadSession(cookies) {
  const session_id = cookies.get("session_id");
  if (session_id === void 0) return null;
  const session = await db.select().from(sessions).where(eq(sessions.session_token, session_id));
  if (session.length === 0) return null;
  const user = await db.select().from(users).where(eq(users.id, session[0].userId));
  if (user.length != 1) {
    console.log("Seems as this account is orphaned");
    return null;
  }
  return user[0];
}
async function preparePassword(pwd) {
  let hash = await bcrypt.hash(pwd, saltRounds);
  return hash;
}
async function makeSession(userId, cookies) {
  const token = crypto.randomUUID();
  const session = {
    userId,
    session_token: token
  };
  cookies.set("session_id", session.session_token, { path: "/" });
  await db.insert(sessions).values(session);
  return true;
}
export {
  loadSession as l,
  makeSession as m,
  preparePassword as p
};
