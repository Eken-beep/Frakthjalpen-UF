<script lang="ts">
    let { data, form } = $props();
    import { enhance } from "$app/forms";
    console.log(data.user)

    const location = data.user.location;
</script>

{location}

<h2>Fyll i en resa du ska göra</h2>
<form action="?/create" method="POST">
    <div class="location-chooser">
        <div>
            <h2>Startplats</h2>
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
            <h2>Slutplats</h2>
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
        Datum för resa
        <input name="date" type="date" required>
    </label>
    <label>
        <input type="submit" value="Ladda upp" style="width: 100%; margin: 1em;">
    </label>
</form>
{#each data.myJourneys as journey}
    <div class="journey">
        <div class="location-chooser">
            <div>
                <h2>Från</h2>
                <ul>
                    <li>{journey.startLocation.city}</li>
                    <li>{journey.startLocation.postalCode}</li>
                    <li>{journey.startLocation.adress}</li>
                </ul>
            </div>

            <div>
                <h2>Till</h2>
                <ul>
                    <li>{journey.endLocation.city}</li>
                    <li>{journey.endLocation.postalCode}</li>
                    <li>{journey.endLocation.adress}</li>
                </ul>
            </div>
        </div>
        <p>Datum: {journey.date}</p>
        <form action="?/remove" method="POST" use:enhance={({ formData: formData }) => {
            formData.append("journey", String(journey.id))
        }}>
            <input type="submit" value="Avbryt resa">
        </form>
    </div>
{/each}

<style>
    .journey {
        background-color: var(--cbg-0);
        border-radius: 15px;
        padding: 1em;
    }

    .journey p {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .location-chooser {
        display: flex;
        justify-content: space-around;
        width: auto;
        margin-bottom: 1em;
    }

    .location-chooser div {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: space-evenly;
        width: auto
    }

    .location-chooser ul {
        list-style: none;
    }

    label input {
        width: 80%;
    }

    @media(max-width: 1070px) {
        .location-chooser {
            flex-direction: column;
        }
        label {
            margin-left: 8%;
        }
    }
</style>
