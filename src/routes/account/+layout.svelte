<script lang="ts">
    import "../../app.css";
    let { children, data } = $props();
    import { page } from "$app/stores";
</script>

<div class="mainbox">
    {#if data.user !== null}
        <div class="main-container">
            <div class="sidebar">
                <ul>
                    <li aria-current={
                        $page.url.pathname.endsWith("profile") ||
                        $page.url.pathname === "/account" ? "page" : undefined
                    }>
                        <a href="/account">Profil</a></li>
                    <li aria-current={
                        $page.url.pathname.endsWith("location") ? "page" : undefined
                    }>
                        <a href="/account/location">Plats</a>
                    </li>
                    <li aria-current={
                        $page.url.pathname.endsWith("my_posts") ? "page" : undefined
                    }>
                        <a href="/account/my_posts">Mina annonser</a>
                    </li>
                    <li aria-current={
                        $page.url.pathname.endsWith("saved_posts") ? "page" : undefined
                    }>
                        <a href="/account/saved_posts">Sparade annonser</a>
                    </li>
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
    .mainbox {
        border-radius: 15px;
        padding: 1em;
        padding-top: 4em;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        overflow-x: hidden;
        align-content: center;
    }

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
        width: calc(100% - 12rem);
        border-left: 3px solid var(--ctext2);
    }

    .sidebar {
        width: 12rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        height: 100%;
    }

    .sidebar ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: start;
    }

    a {
        display: block;
        color: var(--ctext-2);
    }

    li {
        min-height: 2rem;
        font-size: larger;
        position: relative;
    }

    li[aria-current='page']::before {
        content: '';
        position: absolute;
        left: -1em;
        top: calc(50% - 10px);
        width: 0;
        height: 0;
        background-color: var(--ctheme-1);
        border: 6px solid transparent;
        border-right: 6px solid var(--ctheme-1);
    }

    @media(max-width: 1070px) {
        .mainbox {
            padding: 0;
            padding-top: 2em;
        }

        .sidebar {
            width: 100%;
            border-bottom: 2px solid var(--ctext2);
        }
        .main-container {
            padding: 0;
            flex-direction: column;
            background: none;
            width: 100%;
        }

        .content {
            border: none;
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>
