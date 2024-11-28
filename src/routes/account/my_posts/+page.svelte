<script lang="ts">
    import "./../postList.css";
    import type { Post } from "$lib/types";
    let { data, form } = $props();
    const posts: Post[] = data.myPosts;
</script>

{#each posts as post}
    <div class="post-card">
        <h1>{post.title}</h1>
        <div>
            <span class="price">{post.price} kr</span>
            <button class="modify-post">
                radera
            </button>
            <button class="modify-post">
                boosta annons
            </button>
        </div>
    </div>
{/each}

<style>
</style>
