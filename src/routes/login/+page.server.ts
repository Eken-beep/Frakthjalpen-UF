import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { User } from "$lib/types";
import { preparePassword, makeSession, loadSession } from "$lib/server/account";
import { db } from "../../index";
import { users, accounts, sessions } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const load: PageServerLoad = (async ({ cookies }) => {
    const usersList = await db.select().from(users);
    const currentUser: User | null = await loadSession(cookies);
    return {
        user: currentUser,
        users: usersList,
    };
}) satisfies PageServerLoad;

// Registration
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        let user = (await db
            .select()
            .from(users)
            .where(eq(users.email, data.get("email") as string)));

        if (user.length != 1) return {
            success: false, email: data.get("email"), message: "Felaktiga inloggningsuppgifter",
        }

        let account = (await db
            .select()
            .from(accounts)
            .where(eq(accounts.userId, user[0].id as string)));

        if (account.length != 1) throw new Error("No sign in method asociated with this user");

        if (!await bcrypt.compare(data.get("password") as string, account[0].access_token as string)) {
            console.log("Invalid credentials");
            return fail( 400, {
                email: data.get("email"), incorrect: true,
            });
        }

        const success = await makeSession(user[0].id, cookies);

        if (success) redirect(303, "/account");
    },
} satisfies Actions;
