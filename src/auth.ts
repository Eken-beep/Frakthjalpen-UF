import { SvelteKitAuth } from "@auth/sveltekit";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "@auth/sveltekit/providers/credentials";
import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, accounts } from "$lib/server/db/schema";
import type { User, Account } from "@auth/sveltekit";
import bcrypt from "bcrypt";

export let adapter = DrizzleAdapter(db);

export const { signIn, signOut, handle } = SvelteKitAuth({
    adapter: adapter,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        redirect: async ({ url, baseUrl }) => {
            console.log(url, baseUrl);
            return "/account";
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log("Authorizing: ", credentials as string);
                let user = (await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email as string)));

                if (user.length > 1) throw new Error("Database error, more than one account with the same email");

                console.log(user);

                let account = (await db
                    .select()
                    .from(accounts)
                    .where(eq(accounts.userId, user[0].id as string)) as unknown) as Account;

                if (await bcrypt.compare(credentials.password! as string, account.id_token!)) {
                    return {
                        id: user[0].email!,
                    };
                }

                throw new Error("Invalid credentials");
            },
        })
    ],
})
