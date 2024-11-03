<svelte:head>
	<title>Fraktuppdrag</title>
	<meta name="description" content="Tillgängliga fraktuppdrag" />
</svelte:head>

<script lang="ts">
    import type { PageServerData } from "./$types";
    import type { Post, Location } from "$lib/types";
    //import PostInfo from "./Post.svelte";
    const { data }: { data: PageServerData } = $props()
    const currentUser = data.currentUser;
    let selectedPost: Post | null = $state(null);
    let posts: Post[] = [];
    for (const p of data.posts) {
        posts.push(p);
    }

    function exitPost(event: any) {
        if (event.key == "Escape")
            selectedPost = null;
    }

    async function addInterested() {
        const response = await fetch("/api/addinterested", {
            method: "POST",
            body: JSON.stringify({
                // These are certainly not null as user was able to call the function
                userId: currentUser!.id,
                postId: selectedPost!.post_id as number,
            }),
        });

        const { success } = await response.json();
        console.log(success);
    }
</script>

<div class="site-content">
    {#if selectedPost !== null}
        <button
            class="blur"
            onclick={ () => { selectedPost = null }}
            onkeypress={ exitPost }
            aria-label="stäng"
        ></button>
        <div class="postLarge">
            <h1>{selectedPost.title}</h1>
            <hr>
            <p>{selectedPost.description}</p>
            <p style="float: right">{selectedPost.price} kr</p>
            <p>
                Fraktas från {selectedPost.startLocation.city} till {selectedPost.endLocation.city}
            </p>
            <div class="interested">
                {#if currentUser !== null}
                    <button onclick={addInterested}>
                        Anmäl intresse
                    </button>
                {/if}
            </div>
        </div>
    {/if}
	<h1>Alla fraktuppdrag</h1>
    {#each posts as post}
        <button style="all:unset" onclick={() => { selectedPost = post }}>
            <div class="post">
                <h2>{post.title}</h2>
                <ul>
                    <li>{post.price} kr</li>
                    <li>Sänds från {post.startLocation.city} till {post.endLocation.city}</li>
                    <li>{post.description.slice(0,100)}{#if post.description.length > 100}...{/if}</li>
                </ul>
            </div>
        </button>
    {/each}
</div>

<style>
    .post {
        background-color: white;
        border-radius: 15px;
        margin: 4rem;
        padding: 1rem;
    }
    .post:hover {
        background-color: #EFEFEF;
    }
    .post ul {
        list-style: none;
    }
    li {
        padding-bottom: 0.5em;
    }
    button.blur {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: black;
        opacity: 0.5;
        border: none;
    }
    .postLarge {
        position: fixed;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border-radius: 15px;
        padding: 2rem;
        max-width: 60rem;
    }

    .interested {
        display: flex;
        justify-content: center;
    }

    .interested button {
        background-color: var(--ctheme-1);
        border: none;
        border-radius: 15px;
        color: var(--ctext);
        height: 3rem;
        width: 12rem;
        margin-top: 1rem;
        font-size: 1.2rem;
    }
    .interested button:hover {
        background-color: var(--ctheme-2);
    }
</style>
