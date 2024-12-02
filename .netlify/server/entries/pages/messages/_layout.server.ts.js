import { d as db, m as messages, u as users } from "../../../chunks/schema.js";
import { or, eq } from "drizzle-orm";
import { l as loadSession } from "../../../chunks/account.js";
const load = async ({ cookies }) => {
  const user = await loadSession(cookies);
  if (user === null) return null;
  const conversations = await db.select().from(messages).where(or(
    eq(messages.user_a, user.id),
    eq(messages.user_b, user.id)
  ));
  let allUsers = [];
  let uniqueConvIds = [];
  for (const c of conversations) {
    if (!uniqueConvIds.includes(c.user_a))
      uniqueConvIds.push(c.user_a);
    if (!uniqueConvIds.includes(c.user_b))
      uniqueConvIds.push(c.user_b);
  }
  for (const cid of uniqueConvIds) {
    const u = await db.select().from(users).where(eq(users.id, cid));
    if (allUsers === void 0)
      allUsers = u;
    else
      allUsers.push(u[0]);
  }
  return {
    conversations,
    users: allUsers,
    currentUser: user
  };
};
export {
  load
};
