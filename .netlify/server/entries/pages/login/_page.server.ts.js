import { f as fail, r as redirect } from "../../../chunks/index.js";
import { l as loadSession, m as makeSession } from "../../../chunks/account.js";
import { d as db, u as users, a as accounts } from "../../../chunks/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
const load = async ({ cookies }) => {
  const usersList = await db.select().from(users);
  const currentUser = await loadSession(cookies);
  return {
    user: currentUser,
    users: usersList
  };
};
const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    let user = await db.select().from(users).where(eq(users.email, data.get("email")));
    if (user.length != 1) return {
      success: false,
      email: data.get("email"),
      message: "Felaktiga inloggningsuppgifter"
    };
    let account = await db.select().from(accounts).where(eq(accounts.userId, user[0].id));
    if (account.length != 1) throw new Error("No sign in method asociated with this user");
    if (!await bcrypt.compare(data.get("password"), account[0].access_token)) {
      console.log("Invalid credentials");
      return fail(400, {
        email: data.get("email"),
        incorrect: true
      });
    }
    const success = await makeSession(user[0].id, cookies);
    if (success) redirect(303, "/account");
  }
};
export {
  actions,
  load
};
