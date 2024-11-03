<svelte:head>
	<title>Konto</title>
	<meta name="description" content="Kontoinställningar och information" />
</svelte:head>

<script lang="ts">
    import { error, redirect } from "@sveltejs/kit";
    import type { PageData, ActionData } from "./$types";
    import type { User } from "$lib/types";

    let { data, form }: { data: PageData, form: ActionData } = $props();
    let users: any;
    if (data === null) {
        error(500, { message: "Internal Server Error" });
    } else {
        users = data["users"];
    }
    
    import SignIn from "./SignIn.svelte";
    let signedIn = $state(data["user"] === null ? false : true);
    const user: User | null = data["user"];

    async function unloadSession() {
        const request = await fetch("/api/logout", {
            method: "POST",
        })

        const response = await request.json();
        if (response.success) signedIn = false;
    }
</script>

<div class="site-content">
    {#if signedIn}
        <div class="main-container">
            <div class="sidebar">
                <ul>
                    <li>Profil</li>
                    <li>Plats</li>
                    <li>Mina annonser</li>
                    <li>Sparade annonser</li>
                </ul>
            </div>
            <div class="content">
                <ul>
                    <li>Namn: {user!.name}</li>
                    <li>Mejladress: {user!.email}</li>
                    <li>Profilbild: {user!.image}</li>
                    <li><button onclick={unloadSession}>
                        Logga ut
                    </button></li>
                </ul>
            </div>
        </div>
    {:else}
        <h2>Du är inte inloggad, logga in eller skapa ett konto nedan</h2>
        <SignIn users={users} form={form}/>
    {/if}
</div>

<style>
    .main-container {
        margin: 0;
        padding: 1rem;
        background-color: white;
        width: 50rem;
        border-radius: 15px;
        border: none;
        display: flex;
    }

    .content {
        padding: 1rem;
    }

    .sidebar {
        width: 12rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-right: 2px solid var(--ctext);
        height: 100%;
    }

    .sidebar ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: start;
    }

    li {
        min-height: 2rem;
        font-size: larger;
    }

</style>
