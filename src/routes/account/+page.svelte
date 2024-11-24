<svelte:head>
	<title>Konto</title>
	<meta name="description" content="Kontoinställningar och information" />
</svelte:head>

<script lang="ts">
    import Profile from "./profile/+page.svelte";

    const { data, form } = $props();
</script>

<Profile data={data} form={form} />
