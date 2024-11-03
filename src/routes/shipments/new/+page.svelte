<svelte:head>
	<title>Skapa Fraktannons</title>
	<meta name="description" content="Skapa en ny fraktanons" />
</svelte:head>

<script lang="ts">
    import type { User } from "$lib/types";
    import type { PageData, ActionData } from "./$types";
    const { data, form }: { data: PageData, form: ActionData } = $props();

    const user: string | null = data["currentUser"];
</script>

<div class="mainbox">
    {#if user === null}
        <h1>Logga in för att skapa en annons</h1>
    {:else}
        <h1>Skapa en ny fraktannons</h1>
        <form method="POST">
            <label>
                Annonstitel
                <input name="title" type="text" required>
            </label>
            <label>
                Pris för frakten
                <input name="price" type="number" style="width:3em; margin: 0.5em" required>
                Kr
            </label> <br>
            <label>
                Beskrivning <br>
                <textarea name="description" cols="60" ></textarea>
            </label>
            <div class="location-chooser">
                <div>
                    <h2>Upphämtningsplats</h2>
                    <label>
                        Stad/Postort
                        <input name="start_city" type="text" required>
                    </label>
                    <label>
                        Postadress
                        <input name="start_pcode" type="text" required>
                    </label>
                    <label>
                        Adress och gatunummer
                        <input name="start_adress" type="text" required>
                    </label>
                </div>
                <div>
                    <h2>Avlämningsplats</h2>
                    <label>
                        Stad/Postort
                        <input name="destination_city" type="text" required>
                    </label>
                    <label>
                        Postadress
                        <input name="destination_pcode" type="text" required>
                    </label>
                    <label>
                        Adress och gatunummer
                        <input name="destination_adress" type="text" required>
                    </label>
                </div>
            </div>
            <label>
                <input type="submit" value="Ladda upp annons">
            </label>
        </form>
    {/if}
</div>

<style>
    .mainbox {
        background-color: white;
        border-radius: 15px;
        padding: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .location-chooser {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    .location-chooser div {
        display: flex;
        flex-direction: column;
    }

    label {
        padding: 0.5em;
        justify-content: end;
        padding-left: auto;
        padding-right: auto;
        width: 100%
    }
    input {
        width: 100%;
    }
    textarea {
        resize: none;
        width: 80%;
    }
</style>
