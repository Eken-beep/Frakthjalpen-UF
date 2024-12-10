<script lang="ts">
    import FrontsideLogo from "$lib/images/frontside-logo.svg";
</script>

<svelte:head>
	<title>Hem</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="site-content">
	<h1>
        Välkommen till FraktHjälpen
	</h1>
    <h2>
        Ett mer hållbart fraktalternativ
    </h2>
    <hr>
    <img src={FrontsideLogo} alt="Beskrivningsbild">
</div>

<style>
    .site-content {
        overflow: visible;
    }
    h2 {
        font-size: 30pt;
        border-bottom: thick solid var(--ctext);
        color: black;
        flex-grow: 0.01;
        margin-bottom: 3em;
    }
    h1 {
        margin-top: 1.5em;
        text-align: left;
        font-weight: 600;
        color: black;
        font-size: 42pt;
        padding-bottom: 0.3em;
    }
    hr {
        color: var(--ctext);
    }
    p {
        text-align: center;
    }

    body {
        overflow-y: hidden;
    }

    img {
        width: 100%;
    }

    .site-content {
    }
</style>
