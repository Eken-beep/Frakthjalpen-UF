<script lang="ts">
    import "./../app.css";
    import { page } from "$app/stores";
    import menu from "$lib/images/menu.svg";
    import { onNavigate } from "$app/navigation";

    let showSidebar = $state(false);

    onNavigate(() => { showSidebar = false; });
</script>

<header>
    <button class="menu-button" onclick={() => showSidebar = !showSidebar}>
        <img src={menu} alt="meny">
    </button>

    <a class="newpost" href="/shipments/new"><button class="newpost">
        Skapa en fraktannons
    </button></a>
</header>

{#if showSidebar}
    <button
        class="fade"
        aria-label="dölj meny"
        onclick={() => showSidebar = !showSidebar}
    ></button>
    <nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Hem</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">Om Oss</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/messages') ? 'page' : undefined}>
				<a href="/messages">Meddelanden</a>
			</li>
            <li aria-current={$page.url.pathname.startsWith('/shipments') ? 'page' : undefined}>
                <a href="/shipments">Tillgängliga frakter</a>
            </li>
			<li aria-current={$page.url.pathname.startsWith('/account') ? 'page' : undefined}>
				<a href="/account">Konto</a>
			</li>
		</ul>
    </nav>
{/if}

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        display: none;
        justify-content: space-between;
        height: 4em;
        background: var(--background);
        align-items: center;
    }

    .menu-button {
        height: 4em;
        width: 4em;
        background: none;
        border: none;
    }

    .menu-button img {
        height: 100%;
        width: 100%;
    }

    .menu-button:hover:not(:active) {
        background-color: var(--cbg-0);
    }

    ul {
        position: relative;
        width: 70vw;
        height: 100%;
        list-style: none;
        display: flex;
        justify-content: start;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }

    li {
        font-size: 1.6em;
        position: relative;
        width: 70vw;
        height: 3em;
        margin: 0;
        padding: 0;
    }

    li a {
        padding-left: 1em;
        color: var(--ctext);
        width: 80%;
        height: 100%;
        display: block;
    }

    li:hover {
        color: var(--ctext);
        background-color: var(--cbg-0);
        text-transform: none;
    }

    li a:hover {
        color: inherit;
    }

    li[aria-current='page'] {
        background-color: var(--cbg-0);
    }

    nav {
        position: fixed;
        top: 4em;
        left: 0;
        width: 70vw;
        height: calc(100vh - 4em);
        background: var(--background-opaque);
        padding: 0;
    }

    button.fade {
        position: fixed;
        top: 4em;
        left: 0;
        border: none;
        width: 100vw;
        height: calc(100vh - 4em);
        background: rgba(0, 0, 0, 0.2);
    }

    button.newpost {
        font-size: inherit;
        background-color: var(--ctheme-1);
        border: none;
        padding: none;
        border-radius: 1em;
        width: 50vw;
        max-width: 18em;
        height: 80%;
        transition: background-color 0.2s linear;
        transition: color 0.2s linear;
    }
    button.newpost:hover {
        background-color: var(--ctheme-2);
    }

	a.newpost {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		transition: color 0.2s linear;
	}

    a.newpost, button.newpost {
		color: var(--ctext);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
    }

	a:hover {
		color: var(--ctheme-1);
	}

    @media(max-width: 1070px) {
        header {
            display: flex;
        }
    }
</style>
