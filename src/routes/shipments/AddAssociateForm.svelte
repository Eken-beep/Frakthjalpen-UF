<script lang="ts">
    import "./../../app.css";
    import { enhance } from "$app/forms";
    let { parent_post, currentUser }: { parent_post: number, currentUser: string } = $props();
</script>

<div class="form">
    <form method="POST" use:enhance={({ formData: formData }) => {
        formData.append("parent_post_id", String(parent_post));
        formData.append("user", currentUser);
    }}>
        <input
            type="text"
            name="title"
            placeholder="Titel"
            required><br>

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
                    Rörligt köpskydd (10% av paketets värde)
                </label>
            </span><br>
            <span>
                <label>
                    <input type="number" name="value" style="width: 3em;">
                    Paketets värde (kr), inverkar om valt köpskydd är rörligt
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
        <div class="location">
            <div class="start">
                <label for="start">Upphämtningsplats</label>
                <input
                    type="text"
                    name="start_adress"
                    id="start"
                    placeholder="Adress"
                    required
                >
                <input
                    type="text"
                    name="start_pcode"
                    id="start"
                    placeholder="Postnummer"
                    required
                >
                <input
                    type="text"
                    name="start_city"
                    id="start"
                    placeholder="Postort"
                    required
                >
            </div>
            <div class="end">
                <label for="end">Avlämningsplats</label>
                <input
                    type="text"
                    name="end_adress"
                    id="end"
                    placeholder="Adress"
                    required
                >
                <input
                    type="text"
                    name="end_pcode"
                    id="end"
                    placeholder="Postnummer"
                    required
                >
                <input
                    type="text"
                    name="end_city"
                    id="end"
                    placeholder="Postort"
                    required
                >
            </div>
        </div>
        <div class="submit">
            <input
                type="submit"
                value="Begär frakt">
        </div>
    </form>
</div>

<style>
    input[name="title"], textarea {
        width: calc(100% - 4em);
    }
    .submit {
        display: flex;
        justify-content: center;
    }
    form {
        background-color: var(--background-opaque);
        position: fixed;
        top: 20vh;
        left: 30vw;
        width: 40vw;
        height: auto;
        padding: 2em;
        border-radius: 15px;
    }

    .location {
        display: flex;
        justify-content: space-between;
    }

    .location input {
        margin-top: 0.5em;
    }

    .start, .end {
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
</style>
