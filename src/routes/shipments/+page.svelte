<svelte:head>
	<title>Fraktuppdrag</title>
	<meta name="description" content="Tillgängliga fraktuppdrag" />
</svelte:head>

<script lang="ts">
    import type { PageServerData } from "./$types";
    import type { Post } from "$lib/types";
    import { enhance } from "$app/forms";
    import { redirect } from "@sveltejs/kit"
    //import PostInfo from "./Post.svelte";
    import AddAssociateForm from "./AddAssociateForm.svelte";
    const { data }: { data: PageServerData } = $props()
    const currentUser = data.currentUser;
    let selectedPost: Post | null = $state(null);
    let posts: Post[] = [];
    let addAssociate: boolean = $state(false);

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
            <div class="interested">
                {#if currentUser !== null}
                    <button onclick={() => addAssociate = !addAssociate}>
                        Ta med mitt paket på vägen!
                    </button>
                {/if}
            </div>
        </div>
        {#if addAssociate && currentUser !== null}
            <button class="form" aria-label="stäng" onclick={ () => { addAssociate = false } }></button>
                <form method="POST" use:enhance={({ formData: formData }) => {
                    formData.append("parent_post_id", String(selectedPost!.post_id));
                    formData.append("user", String(currentUser.id));
                }}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titel"
                        required><br>

                    <label>
                        Paketets vikt
                        <input name="weight" type="number" style="width:3em; margin: 0.5em" required>
                        Kg
                    </label><br>
                    <fieldset>
                        <legend>Välj typ av köpskydd</legend>

                        <span>
                            <label>
                                <input class="radio" type="radio" name="bp" value="bp_const" checked>
                                Fast köpskydd
                            </label>
                        </span><br>
                        <span>
                            <label>
                                <input class="radio" type="radio" name="bp" value="bp_flex">
                                Rörligt köpskydd (10% av paketets värde)
                            </label>
                        </span><br>
                        <span>
                            <label>
                                <input type="number" name="value" style="width: 3em;" value={0}>
                                Paketets värde (kr), inverkar om valt köpskydd är rörligt
                            </label>
                        </span>
                        <p>
                            Läs mer om köpskydd <a href="/about#bp">här</a>
                        </p>
                    </fieldset>
                    <label>
                        Beskrivning <br>
                        <textarea name="description" cols="60" ></textarea>
                    </label>
                    <div class="location">
                        <div class="start">
                            <label for="start">Upphämtningsplats</label>
                            <input
                                type="text"
                                name="start_adress"
                                id="start"
                                placeholder="Adress"
                                required
                            >
                            <input
                                type="text"
                                name="start_pcode"
                                id="start"
                                placeholder="Postnummer"
                                required
                            >
                            <input
                                type="text"
                                name="start_city"
                                id="start"
                                placeholder="Postort"
                                required
                            >
                        </div>
                        <div class="end">
                            <label for="end">Avlämningsplats</label>
                            <input
                                type="text"
                                name="end_adress"
                                id="end"
                                placeholder="Adress"
                                required
                            >
                            <input
                                type="text"
                                name="end_pcode"
                                id="end"
                                placeholder="Postnummer"
                                required
                            >
                            <input
                                type="text"
                                name="end_city"
                                id="end"
                                placeholder="Postort"
                                required
                            >
                        </div>
                    </div>
                    <div class="submit">
                        <input
                            type="submit"
                            value="Begär frakt">
                    </div>
                </form>
        {/if}
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

    .form {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: black;
        opacity: 0.5;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form {
        box-sizing: border-box;
        position: fixed;
        background-color: var(--background-opaque);
        width: 40em;
        height: auto;
        padding: 2em;
        border-radius: 15px;
        z-index: 10;
        left: calc(50vw - 20em);
        top: calc(50vh - 20em);
        max-height: 100vh;
    }

    input[name="title"], textarea {
        width: calc(100% - 4em);
    }
    .submit {
        display: flex;
        justify-content: center;
    }
    .location {
        display: flex;
        justify-content: space-between;
    }

    .location input {
        margin-top: 0.5em;
    }

    .start, .end {
        display: flex;
        flex-direction: column;
        justify-content: start;
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

        form {
            width: 100vw;
            left: 0;
            top: 0;
            padding-left: 2px;
            padding-right: 2px;
            overflow-y: scroll;
            border-radius: 0;
        }

        .location {
            flex-direction: column;
        }

        input[name=title], textarea {
            box-sizing: border-box;
            width: calc(100vw - 4px);
        }
    }
</style>
