<script lang="ts">
    import "./../postList.css";
    import type { Post } from "$lib/types";
    import type { PageData, ActionData } from "./$types";
    import { enhance } from "$app/forms";
    import { invalidateAll, goto } from "$app/navigation";
    let { data, form }: { data: PageData, form: ActionData } = $props();

    let posts: Post[] = $state(data.myPosts);

    let modify = $state(false);

    import PostBare from "./../PostBare.svelte";

    let currentPost: Post | null = $state(null);

    async function deletePost() {
        await fetch("/api/modify_post", {
            method: "POST",
            body: JSON.stringify({
                action: "remove",
                post: currentPost,
            }),
        });
        goto("/account");
    }

    async function boostPost() {
        const result = await fetch("/api/modify_post", {
            method: "POST",
            body: JSON.stringify({
                action: "boost",
                post: currentPost,
            }),
        });

        const json = await result.json();
        window.location = json.url;
    }

    async function confirmShipment() {
        await fetch("/api/confirm", {
            method: "POST",
            body: JSON.stringify({
                post_id: currentPost!.post_id,
            })
        });
    }
</script>

<div class="posts">
    {#each posts as post, i}
        <div class="post-card">
            <PostBare post={post} />
            <div>
                <button class="modify-post" onclick={async () => {
                    currentPost = post;
                    deletePost();
                    goto("/account", { invalidateAll: true });
                }}>
                    <span style="color: red">RADERA</span>
                </button>
                <button class="modify-post" onclick={async () => {
                    currentPost = post;
                    await boostPost();
                }}>
                    Boosta annons
                </button>
                <button class="modify-post" onclick={() => {
                    currentPost = post;
                    modify = !modify;
                }}>
                    Redigera
                </button>
                <button class="modify-post" onclick={async () => {
                    currentPost = post;
                    await confirmShipment();
                    goto("/account", { invalidateAll: true });
                }} title="Klicka här för att godkänna att du fått varan fraktad till dig, fungerar bara om den redan är betald">
                    Verifiera frakt
                </button>
            </div>
            {#if modify && currentPost === post}
                <div class="modify-post-container">
                    {#if form?.missing}<h2 class="error">Vänligen fyll i alla fält</h2>{/if}
                    <form method="POST" use:enhance={({ formData: formData }) => {
                        formData.append("owner", currentPost!.owner);
                        formData.append("post_id", String(currentPost!.post_id));
                        formData.append("price", String(currentPost!.price));
                        formData.append("interestedUsers",
                            String(JSON.stringify(currentPost!.interestedUsers))
                        );
                        formData.append("state", currentPost!.state);
                        modify = false;
                    }} data-sveltekit-reload>
                        <input
                            type="text"
                            value={currentPost.title}
                            name="title"
                            placeholder="Titel">
                        <div class="location">
                            <div class="start">
                                <label for="start">Upphämtningsplats</label>
                                <input
                                    type="text"
                                    value={form?.start_adress ?? currentPost.startLocation.adress}
                                    name="start_adress"
                                    id="start"
                                    placeholder="Adress"
                                >
                                <input
                                    type="text"
                                    value={currentPost.startLocation.postalCode}
                                    name="start_pcode"
                                    id="start"
                                    placeholder="Postnummer"
                                >
                                <input
                                    type="text"
                                    value={currentPost.startLocation.city}
                                    name="start_city"
                                    id="start"
                                    placeholder="Postort"
                                >
                            </div>
                            <div class="end">
                                <label for="end">Avlämningsplats</label>
                                <input
                                    type="text"
                                    value={currentPost.endLocation.adress}
                                    name="end_adress"
                                    id="end"
                                    placeholder="Adress"
                                >
                                <input
                                    type="text"
                                    value={currentPost.endLocation.postalCode}
                                    name="end_pcode"
                                    id="end"
                                    placeholder="Postnummer"
                                >
                                <input
                                    type="text"
                                    value={currentPost.endLocation.city}
                                    name="end_city"
                                    id="end"
                                    placeholder="Postort"
                                >
                            </div>
                        </div>
                        <textarea name="description" value={currentPost.description}></textarea>
                        <div class="submit">
                            <button class="modify-post">
                                Avbryt
                            </button>
                            <input type="submit" value="Spara" name="save" class="modify-post">
                        </div>
                    </form>
                </div>
            {/if}
            {#if posts.length > 1 && i !== (posts.length - 1)}
                <hr>
            {/if}
        </div>
    {/each}
</div>

<style>
    .modify-post-container form {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: start;
    }

    .location {
        display: flex;
        justify-content: space-between;
    }

    .start, .end {
        display: flex;
        flex-direction: column;
        justify-content: start;
    }

    .submit {
        margin-top: 1em;
    }

    input[type="text"] {
        margin-top: 1em;
    }

    label {
        margin-top: 1em;
        font-size: larger;
    }

    @media(max-width: 1070px) {
        .location {
            flex-direction: column;
        }
    }
</style>
