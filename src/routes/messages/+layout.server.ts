import type { LayoutServerLoad } from "./$types";
import type { User, Conversation } from "$lib/types";
import { db } from "../../index";
import { users, messages } from "$lib/server/db/schema";
import { eq, or } from "drizzle-orm";
import { loadSession } from "$lib/server/account";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const user = await loadSession(cookies);
    if(user === null) return null;

    const conversations: Array<Conversation> = await db
        .select()
        .from(messages)
        .where(or(
            eq(messages.user_a, user.id),
            eq(messages.user_b, user.id),
        ));

    let allUsers: User[] = [];
    // Get an array of all the users this person talks to
    let uniqueConvIds: Array<string> = [];
    for(const c of conversations) {
        if (!uniqueConvIds.includes(c.user_a))
            uniqueConvIds.push(c.user_a);
        if (!uniqueConvIds.includes(c.user_b))
            uniqueConvIds.push(c.user_b);
    }

    for(const cid of uniqueConvIds) {
        const u = await db.select().from(users).where(eq(users.id, cid));
        if (allUsers === undefined)
            allUsers = u;
        else
            allUsers.push(u[0]);
    };

    console.log(conversations);

    return {
        conversations: conversations,
        users: allUsers,
        currentUser: user,
    }
}
