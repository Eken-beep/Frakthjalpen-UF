import bcrypt from "bcrypt";
import type { Cookies } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { db } from "../../index";
import { eq } from "drizzle-orm";
import { users, accounts, sessions, posts } from "./db/schema";
import type { Location, Session, User } from "$lib/types";
const saltRounds = 10;

export async function loadSession(cookies: Cookies): Promise<User | null> {
    const session_id = cookies.get("session_id");
    if (session_id === undefined) return null;

    const session = await db.select().from(sessions).where(eq(sessions.session_token, session_id));
    // Means we are not signed in
    if (session.length === 0) return null;

    const user = await db.select().from(users).where(eq(users.id, session[0].userId))
    if (user.length != 1) {
        console.log("Seems as this account is orphaned");
        return null;
    }

    return user[0];
}

export async function preparePassword(pwd: string): Promise<string> {
    let hash = await bcrypt.hash(pwd, saltRounds);
    return hash;
}

export async function makeSession(userId: string, cookies: Cookies): Promise<boolean> {
    const token = crypto.randomUUID();
    const session: Session = {
        userId: userId,
        session_token: token,
    }
    cookies.set("session_id", session.session_token, { path: '/' });

    await db.insert(sessions).values(session);

    return true;
}
