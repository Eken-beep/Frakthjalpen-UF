<script lang="ts">
    import "./../postList.css";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    import type { Post, User } from "$lib/types";
    let { data, form } = $props();
    const posts: Post[] = data.savedPosts;
    const associatedPosts: Post[] = data.savedAssociatedPosts;

    import PostBare from "./../PostBare.svelte";

    const user: User = data.user;

    async function gotoPost(post: Post) {
        const response = await fetch("/api/get_conversation", {
            method: "POST",
            body: JSON.stringify({
                post: post,
                user: user.id,
            }),
        });

        const result = await response.json();
        if (!result.missing) await goto(`/messages/${result.conversationId}`)
    }
</script>

<div class="posts">
    {#each posts as post, i}
        <div class="post-card">
            <PostBare post={post} />
            <button class="modify-post" onclick={ async () => await gotoPost(post)}>
                Gå till meddelanden
            </button>
        </div>
        {#if post.associatedPosts!.length > 0}
            <div class="associatedPosts">
                <h2>Frakter du begärs göra samtidigt</h2>
                {#each (associatedPosts.filter((p) => post.associatedPosts!.includes(p.post_id))) as associated}
                    <hr>
                    <PostBare post={associated} />
                {/each}
            </div>
        {/if}
        {#if posts.length > 1 && i !== (posts.length - 1)}
            <hr>
        {/if}
    {/each}
</div>

<style>
    .associatedPosts {
        background-color: var(--cbg-1);
        padding: 1em;
        border-radius: 15px;
    }
</style>
