<script lang="ts">
    import "../../app.css";
    let { children, data } = $props();
    import { page } from "$app/stores";
</script>

<div class="site-content">
    {#if data.user !== null}
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
                {@render children()}
            </div>
        </div>
    {:else}
        <h2>Du är inte inloggad, logga in eller skapa ett konto nedan</h2>
        <a href="/login">Klicka här för att logga in</a>
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
