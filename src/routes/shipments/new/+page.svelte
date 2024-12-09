<svelte:head>
	<title>Skapa Fraktannons</title>
	<meta name="description" content="Skapa en ny fraktanons" />
</svelte:head>

<script lang="ts">
    import type { User } from "$lib/types";
    import type { PageData, ActionData } from "./$types";
    const { data, form }: { data: PageData, form: ActionData } = $props();

    const user: User | null = data["currentUser"];
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
                Paketets vikt
                <input name="weight" type="number" style="width:3em; margin: 0.5em" required>
                Kg
            </label> <br>
            <fieldset>
                <legend>Välj typ av köpskydd</legend>

                <span>
                    <label>
                        <input class="radio" type="radio" name="bp" value="bp_const" checked>
                        Fast köpskydd
                    </label>
                </span><br>
                <span>
                    <label>
                        <input class="radio" type="radio" name="bp" value="bp_flex">
                        Rörligt köpskydd
                    </label>
                </span>
                <p>
                    Läs mer om köpskydd <a href="/about#bp">här</a>
                </p>
            </fieldset>
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
        padding-top: 2em;
        margin-top: auto;
        margin-bottom: auto;
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
    input.radio {
        display: inline-block;
        width: auto;
    }
    textarea {
        resize: none;
        width: 80%;
    }

    @media(max-width: 1070px) {
        .location-chooser {
            flex-direction: column;
        }

        .mainbox {
            background: none;
        }

        input {
            width: calc(100% - 2em);
        }

        textarea {
            width: calc(100% - 2em);
        }

        fieldset {
            width: calc(100% - 2em);
            margin-left: 0;
            margin-right: 0;
        }
    }
</style>
