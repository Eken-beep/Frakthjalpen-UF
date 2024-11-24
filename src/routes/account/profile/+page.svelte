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
        console.log(response)
        if (response.success) {
            console.log("loggar ut");
            redirect(303, "/account");
        }
    }
</script>

<ul>
    <li>Namn: {user!.name}</li>
    <li>Mejladress: {user!.email}</li>
    <li>Profilbild: {user!.image}</li>
    <li><button data-sveltekit-reload onclick={async () => await unloadSession()}>
        Logga ut
    </button></li>
</ul>

<style>
    li {
        min-height: 2rem;
        font-size: larger;
    }
    button {
        display: inline-block;
        width: 8em;
        height: 2em;
        background-color: var(--ctext2);
    }

</style>
