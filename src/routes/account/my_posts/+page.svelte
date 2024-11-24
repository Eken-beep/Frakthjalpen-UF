<script lang="ts">
    import type { Post } from "$lib/types";
    let { data, form } = $props();
    const posts: Post[] = data.myPosts;
</script>

{#each posts as post}
    {post.title}
{/each}
