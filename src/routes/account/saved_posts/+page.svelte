<script lang="ts">
    import type { Post } from "$lib/types";
    let { data, form } = $props();
    const posts: Post[] = data.savedPosts;
</script>

{#each posts as post}
    {post.title}
{/each}
