<script lang="ts">
    import type { User } from "$lib/types";
    import type { PageServerData, ActionData } from "./$types";

    let { data, form }: { data: PageServerData, form: ActionData } = $props();

    console.log(data.user);

    import logo from "$lib/images/logo_transparent.svg";
</script>

<div class="login-box">
    {#if data.user === null}
        <form method="POST"><ul>
            {#if form?.success === false}<p>Felaktiga inloggningsuppgifter</p>{/if}
            <li><label>
                Email<br>
                <input name="email" type="email" value={form?.email ?? ''} required/>
            </label></li>
            <li><label>
                Lösenord<br>
                <input name="password" type="password" required/>
            </label></li>
            <li>
                <input type="submit" value="Logga in">
            </li>
        </ul></form>
        <img src={logo} alt="Logo" height="160px" />
        <span>Har du inget konto? <a href="/register">Klicka här!</a></span>
    {:else}
        <h2>Du är redan inloggad</h2>
    {/if}
</div>

<style>
    form {
        padding: 0%;
        margin: 5%;
        width: 100%;
    }

    form ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
    }
    form ul li {
        margin-top: 1em;
    }
    .login-box {
        z-index: 10;
        display: flex;
        width: 24rem;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        align-content: center;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 15px;
        padding: 1em;
    }

    input {
        width: 70%;
    }

    input[type="submit"] {
        width: 80%;
    }

    @media(max-width: 1070px) {
        .login-box {
            width: 100vw;
            height: auto;
            border-radius: 0;
        }
    }
    span {
        text-align: center;
    }
</style>
