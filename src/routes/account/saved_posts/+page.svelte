<script lang="ts">
    import "./../postList.css";
    import type { Post } from "$lib/types";
    let { data, form } = $props();
    const posts: Post[] = data.savedPosts;

    import PostBare from "./../PostBare.svelte";
</script>

<div class="posts">
    {#each posts as post, i}
        <div class="post-card">
            <PostBare post={post} />
        </div>
        {#if posts.length > 1 && i !== (posts.length - 1)}
            <hr>
        {/if}
    {/each}
</div>
