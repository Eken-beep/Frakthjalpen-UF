import { error, json } from "@sveltejs/kit";
import { db } from "./../../../index";
import { posts, messages } from "$lib/server/db/schema";

export async function POST({ request }) {
    const body = await request.text();

    return json(200);
}
