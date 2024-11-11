<script lang="ts">
    import type { User } from "$lib/types";
    import type { ActionData, PageServerData } from "./$types";
    let mode = $state("signin");

    let { data, form }: { data: PageServerData, form: ActionData } = $props();

    import logo from "$lib/images/logo_transparent.svg";
</script>

<div class="login-box">
    {#if data.user === null}
        {#if form?.success === false}<p>{form?.message}</p>{/if}
        <form method="POST"><ul>
            <li><label>
                För och efternamn
                <input name="name" type="text" value={form?.name ?? ''} required/>
            </label></li>
            <li><label>
                Email
                <input name="email" type="email" value={form?.email ?? ''} required/>
            </label></li>
            <li><label>
                Lösenord
                <input name="password" type="password" required/>
            </label></li>
            <li><button style="width: 100%">
                Registrera konto
            </button></li>
        </ul></form>
        <img src={logo} alt="Logo" height="160px" />
    {:else}
        <h2>Du är redan inloggad</h2>
    {/if}
</div>

<style>
    form {
        padding: 0%;
        margin: 5%;
    }

    form ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    form ul li {
        margin-top: 1em;
    }
    .login-box {
        z-index: 10;
        display: flex;
        width: 24rem;
        flex-direction: column;
        flex: 0.1;
        justify-content: center;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 15px;
        padding: 0;
    }
</style>
