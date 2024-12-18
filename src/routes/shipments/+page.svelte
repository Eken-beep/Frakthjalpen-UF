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

        const pindex: number = posts.indexOf(selectedPost!);
        if (posts[pindex].interestedUsers !== null) {
            posts[pindex].interestedUsers.push(currentUser!.id);
        } else {
            posts[pindex].interestedUsers = [ currentUser!.id ];
        }
        if (selectedPost!.interestedUsers !== null) {
            selectedPost!.interestedUsers.push(currentUser!.id);
        } else {
            selectedPost!.interestedUsers = [ currentUser!.id ];
        }
    }

    function isAlreadyInterested(post: Post): boolean {
        if (post.interestedUsers === null) {
            return false;
        } else {
            if (currentUser !== null) {
                return post.interestedUsers.includes(currentUser.id);
            } else {
                return true;
            }
        }
    }
</script>

<div class="content">
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
            <pre>{selectedPost.description}</pre>
            <p style="float: right">{selectedPost.price + selectedPost.bp} kr <br>
                Varav {selectedPost.price} kr går till fraktaren
            <p>
                Fraktas från {selectedPost.startLocation.city} till {selectedPost.endLocation.city}
            </p>
            <div class="interested">
                {#if currentUser !== null}
                    {#if !isAlreadyInterested(selectedPost)}
                        <button onclick={addInterested}>
                            Anmäl intresse
                        </button>
                    {/if}
                {/if}
            </div>
        </div>
    {/if}
	<h1>Alla fraktuppdrag</h1>
    {#each posts as post}
        <button class="post-button" onclick={() => { selectedPost = post }}>
            <div class="post">
                <h2>{post.title}</h2>
                <ul>
                    <li>{post.price + post.bp} kr</li>
                    <li>Sänds från {post.startLocation.city} till {post.endLocation.city}</li>
                    <li>{post.description.slice(0,100)}{#if post.description.length > 100}...{/if}</li>
                </ul>
            </div>
        </button>
    {/each}
</div>

<style>
    .content {
        max-width: 60rem;
        margin: 0 auto;
        overflow-y: scroll;
        margin-top: 4em;
    }
    .post {
        background-color: white;
        border-radius: 15px;
        margin: 0;
        padding: 1rem;
        width: 55rem;
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

    .post-button {
        all: unset;
        width: 60rem;
        margin-bottom: 2em;
    }

    @media(max-width: 1070px) {
        h2 {
            width: calc(100vw - 2rem);
        }
        .post {
            margin: 0;
            width: 100vw;
            background: none;
            border-radius: 0;
        }

        .post-button {
            width: 100vw;
            margin: 0;
            border-bottom: 2px solid var(--ctext);
        }
    }
</style>
