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
        let price: number;
        let bp: number = 0;

        {
            const w = (data.get("weight") as unknown) as number;
            if (w < 5) {
                price = 125;
            } else if ( 5 <= w && w < 10) {
                price = 195;
            } else if ( 10 <= w && w < 20) {
                price = 255;
            } else {
                price = 300;
            }
        }
        {
            const typeBp = (data.get("bp") as unknown) as string;
            bp = typeBp === "bp_const" ? price / 4 : price * 0.1;
        }

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
            price: price + bp,
            description: data.get("description") as string,
            startLocation: startLocation,
            endLocation: endLocation,
        })

        redirect(303, "/shipments");
    }
}
