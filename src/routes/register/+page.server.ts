import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { User } from "$lib/types";
import { preparePassword, makeSession, loadSession } from "$lib/server/account";
import { db } from "../../index";
import { users, accounts, sessions } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

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
        const email = data.get("email");
        const password = data.get("password") as string;
        const name = data.get("name");
        const id = crypto.randomUUID() as string;

        if (email === undefined && name === undefined) return {
            success: false, name: name, email: email, message: "Vänligen fyll i alla fälten",
        };

        let passwordHash = await preparePassword(password!.toString());

        const emailExists = await db.select().from(users).where(eq(users.email, email as string));
        if (emailExists.length !== 0) return {
            success: false, name: name, message: "Ett konto med denna mejladress finns redan",
        }

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

        redirect(303, "/login");
    },
} satisfies Actions;
