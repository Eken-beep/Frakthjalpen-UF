import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
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
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password") as string;
        const name = data.get("name");
        const id = crypto.randomUUID() as string;

        if (email === undefined || name === undefined) fail(400, {
            email: email, name: name, missing: true,
        });

        let passwordHash = await preparePassword(password!.toString());

        const user = {
            email: email as string,
            emailVerified: null,
            id: id,
            name: name as string,
        };

        const account = {
            userId: user.id,
            access_token: passwordHash,
        };

        await db.insert(users).values(user);
        await db.insert(accounts).values(account);
    },
    
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        console.log("Authorizing: ", data);
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

        await makeSession(user[0].id, cookies);

        return { success: true };
    },
} satisfies Actions;
