import { r as redirect } from "../../../chunks/index.js";
import { l as loadSession, p as preparePassword } from "../../../chunks/account.js";
import { d as db, u as users, a as accounts } from "../../../chunks/schema.js";
import { eq } from "drizzle-orm";
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
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const id = crypto.randomUUID();
    if (email === void 0 && name === void 0) return {
      success: false,
      name,
      email,
      message: "Vänligen fyll i alla fälten"
    };
    let passwordHash = await preparePassword(password.toString());
    const emailExists = await db.select().from(users).where(eq(users.email, email));
    if (emailExists.length !== 0) return {
      success: false,
      name,
      message: "Ett konto med denna mejladress finns redan"
    };
    const user = {
      email,
      emailVerified: null,
      id,
      name
    };
    const account = {
      userId: user.id,
      access_token: passwordHash
    };
    await db.insert(users).values(user);
    await db.insert(accounts).values(account);
    redirect(303, "/login");
  }
};
export {
  actions,
  load
};
