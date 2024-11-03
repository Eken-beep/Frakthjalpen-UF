<script lang="ts">
    import type { User } from "$lib/types";
    import type { ActionData } from "./$types";
    let mode = $state("signin");

    let { users, form }: { users: Array<User>, form: ActionData } = $props();

    import logo from "$lib/images/logo_transparent.svg";
</script>

<div class="login-box">
    <div class="login-header">
        <button
            style="border-top-left-radius: 15px; border-right: solid 2px var(--cbg-0)"
            aria-pressed={mode === "signin" ? true : false}
            onclick={() => mode = "signin"}
        >
            Logga in
        </button>
        <button
            style="border-top-right-radius: 15px"
            aria-pressed={mode === "register" ? true : false}
            onclick={() => mode = "register"}
        >
            Registrera dig
        </button>
    </div>
    {#if mode === "signin"}
        <form method="POST" action="?/login"><ul>
            {#if form?.success === false}<p>Felaktiga inloggningsuppgifter</p>{/if}
            <li><label>
                Email
                <input name="email" type="email" value={form?.email ?? ''} required/>
            </label></li>
            <li><label>
                Lösenord
                <input name="password" type="password" required/>
            </label></li>
            <li><button style="width: 100%">
                Logga in
            </button></li>
        </ul></form>
    {:else if mode === "register"}
        registrera dig nu, {users.length} andra användare just nu
        {#if form?.success === false}<p>Vänligen fyll i alla fälten</p>{/if}
        <form method="POST" action="?/register"><ul>
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
    {/if}
    <img src={logo} alt="Logo" height="160px" />
</div>

<style>
    .login-header {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    .login-header button {
        color: var(--ctext);
        width: auto;
        font-size: 1.2rem;
        border: none;
        background-color: inherit;
        width: 50%;
    }
    .login-header button[aria-pressed=false]:hover {
        color: var(--ctheme-1);
    }
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
