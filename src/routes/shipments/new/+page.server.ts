import type { PageServerLoad } from "./$types";
import type { User, Location, Post } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { db } from "../../../index";
import { posts } from "$lib/server/db/schema";
import { loadSession } from "$lib/server/account";

let user: User | null;

export const load: PageServerLoad = async ({ cookies }) => {
    user = await loadSession(cookies);
    return {
        currentUser: user,
    }
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const startLocation: Location = {
            city: data.get("start_city") as string,
            postalCode: data.get("start_pcode") as string,
            adress: data.get("start_adress") as string,
        }
        const endLocation: Location = {
            city: data.get("destination_city") as string,
            postalCode: data.get("destination_pcode") as string,
            adress: data.get("destination_adress") as string,
        }

        const timestamp = Date.now();

        await db.insert(posts).values({
            owner: user!.id,
            post_id: timestamp,
            title: data.get("title") as string,
            price: Number(data.get("price") as string),
            description: data.get("description") as string,
            startLocation: startLocation,
            endLocation: endLocation,
        })

        redirect(303, "/shipments");
    }
}
