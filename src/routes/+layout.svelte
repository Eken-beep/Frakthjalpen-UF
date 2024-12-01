<script lang="ts">
	import Header from './Header.svelte';
    import HeaderMobile from './HeaderMobile.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />
    <HeaderMobile />

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
            Kontakta oss via <a href="mailto:frakthjalpen.uf@outlook.com">vår mejladress</a>!
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

    @media(width: 1070px) {
        main {
            padding: 0;
        }
    }
</style>
