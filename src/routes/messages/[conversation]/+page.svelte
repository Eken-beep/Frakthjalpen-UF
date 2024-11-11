<script lang="ts">
    import '../../../app.css';
    import { redirect } from "@sveltejs/kit";
    import type { Message, Conversation } from "$lib/types";

    let { data } = $props();
    let conversation: Conversation = data.conversation[0];
    let messages: Message[] = $state(conversation.messages!)
    let currentUser = data.currentUser;
    if (currentUser === null) {
        redirect(303, "/");
    }
</script>

<div class="conversation">
    <ul class="messages">
        {#each messages as message}
            <li aria-label={message.sender === currentUser.id ? "me" : "other"}>
                <span>
                    {message.text}
                </span>
            </li>
        {/each}
    </ul>

    <div class="message-send">
        <form action="?/send" method="POST">
            <input name="textmessage" type="text">
            <input type="submit" name="Skicka">
        </form> 
    </div>
</div>

<style>
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        height: 80%;
        scroll-behavior: smooth;
        overflow-x: hidden;
    }
    li span {
        background-color: white;
        padding: 0.5em;
        border-radius: 1em;
        height: auto;
    }
    li {
        margin-top: 1.5em;
    }
    li[aria-label="me"] {
        margin-left: 2em;
    }
    li[aria-label="me"] span {
        background-color: lightskyblue;
    }
    li[aria-label="me"]::before {
        position: absolute;
        right: 0;
        top: 0;
        width: 40em;
        height: 1em;
    }
    .conversation {
        height: 80vh;
        background-color: var(--cbg-1);
        padding-top: 1em;
        border-radius: 15px;
        width: 45vw
    }

    .message-send {
        background-color: #FFFFFF;
        display: flex;
        justify-content: space-around;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding-top: 0.5em;
        padding-left: 1em;
        width: 45vw;
        height: 3rem;
    }

    .message-send form {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .message-send form input[name="textmessage"] {
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
        width: 150%;
    }
</style>
