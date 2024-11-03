import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "./../../../index";
import { sessions, accounts } from "$lib/server/db/schema";
import type { User } from "$lib/types";

export async function POST({ request, cookies }) {
    const session_id = cookies.get("session_id");
    if(session_id === undefined) return json({ success: false });

    const account = await db.select().from(accounts).where(eq(accounts.session_token, session_id));
    cookies.delete("session_id", { path: "/" });

    await db.delete(sessions).where(eq(sessions.session_token, session_id));

    return json({ success: true });
}
