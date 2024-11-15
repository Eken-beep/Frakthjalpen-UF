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
    <div class="messages">
        {#each messages as message}
            <div class="message" aria-label={message.sender === currentUser.id ? "me" : "other"}>
                <span class="bubble">
                    {message.text}
                </span>
            </div>
        {/each}
    </div>

    <div class="message-send">
        <form action="?/send" method="POST">
            <input name="textmessage" type="text">
            <input type="submit" name="Skicka" value="Skicka">
        </form> 
    </div>
</div>

<style>
    .messages {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        height: max-content;
        scroll-behavior: smooth;
        overflow-x: hidden;
        height: 92%;
    }
    span.bubble {
        display: block;
        background-color: white;
        padding: 0.5em;
        border-radius: 1em;
        height: auto;
        overflow: hidden;
    }
    .message {
        margin: 1.5em 2em 0 2em;
        display: flex;
        justify-content: flex-start;
    }
    .message[aria-label="me"] {
        justify-content: flex-end;
    }
    .message[aria-label="me"] span {
        background-color: lightskyblue;
        max-width: 80%;
    }
    .conversation {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 85vh;
        background-color: var(--cbg-1);
        padding: 10;
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
        padding-bottom: 0.5em;
        width: 100%;
        height: 8%;
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

    input[name="Skicka"] {
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
    }
</style>
