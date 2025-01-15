import { eq } from "drizzle-orm";
import { db } from "./../../../index";
import { loadSession } from "$lib/server/account";
import { journeys } from "$lib/server/db/schema";

export { load } from "../loadUser";

export const actions = {
    create: async ({ request, cookies }) => {
        const currentUser = await loadSession(cookies);
        const formData = await request.formData();

        await db.insert(journeys).values({
            id: Date.now(),
            owner: currentUser!.id,
            date: formData.get("date") as string,
            associatedPosts: [],
            startLocation: {
                postalCode: formData.get("start_pcode") as string,
                city: formData.get("start_city") as string,
                adress: formData.get("start_adress") as string,
            },
            endLocation: {
                postalCode: formData.get("destination_pcode") as string,
                city: formData.get("destination_city") as string,
                adress: formData.get("destination_adress") as string,
            },
        });
    },
    remove: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get("journey") as string)

        await db.delete(journeys).where(eq(journeys.id, id));
    }
}
