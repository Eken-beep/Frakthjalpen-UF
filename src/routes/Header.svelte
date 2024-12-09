<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
    <div class="corner">
    </div>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
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
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
    <div class="corner">
        <a href="/shipments/new"><button class="newpost">
            Skapa en fraktannons
        </button></a>
    </div>
</header>

<style>
    header {
        font-family: Arial, system-ui;
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100vw;
    }

	nav {
		display: flex;
		justify-content: center;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

    .corner {
        width: 15em;
        height: 3em;
    }

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--ctheme-1);
	}

    button.newpost {
        font-size: inherit;
        background-color: var(--ctheme-1);
        border: none;
        padding: none;
        border-radius: 1em;
        margin-right: 6rem;
        width: 80%;
        height: 90%;
        margin-top: 5%;
        margin-left: 10%;
        transition: background-color 0.2s linear;
        transition: color 0.2s linear;
    }
    button.newpost:hover {
        background-color: var(--ctheme-2);
    }

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		transition: color 0.2s linear;
	}

    nav a, button.newpost {
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
            display: none;
        }
    }
</style>
