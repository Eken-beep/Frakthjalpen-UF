<script lang="ts">
    let { data, form } = $props();
    console.log(data.user)

    const location = data.user.location;
</script>

{String(location)}
