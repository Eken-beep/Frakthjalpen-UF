<svelte:head>
	<title>Konto</title>
	<meta name="description" content="Kontoinställningar och information" />
</svelte:head>

<script lang="ts">
    import { error, redirect } from "@sveltejs/kit";
    import type { PageServerData, ActionData } from "./$types";
    import type { User } from "$lib/types";

    let { data, form }: { data: PageServerData, form: ActionData } = $props();
    
    const user: User | null = data["user"];

    async function unloadSession() {
        const request = await fetch("/api/logout", {
            method: "POST",
        })

        const response = await request.json();
        if (response.success) redirect(303, "/");
    }
</script>

<ul>
    <li>Namn: {user!.name}</li>
    <li>Mejladress: {user!.email}</li>
    <li>Profilbild: {user!.image}</li>
    <li><button onclick={unloadSession}>
        Logga ut
    </button></li>
</ul>

<style>
    li {
        min-height: 2rem;
        font-size: larger;
    }

</style>
