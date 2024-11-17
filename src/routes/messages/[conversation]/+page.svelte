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
        <form action="?/modify" method="POST">
            <input class="cc" type="submit" name="complete" value="Acceptera">
            <input class="cc" type="submit" name="end" value="Avsluta">
        </form>
        <form action="?/send" method="POST">
            <input name="textmessage" type="text" class="textbox">
            <input type="submit" name="Skicka" value="Skicka" class="send">
        </form> 
    </div>
</div>

<style>
    .messages {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        min-height: calc(100% - 8em);
        scroll-behavior: smooth;
        overflow-x: hidden;
        padding: 1em;
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
        margin-top: 2em;
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
        justify-content: space-evenly;
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
        justify-content: space-evenly;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding: 0.5em;
        width: calc(100% - 1em);
        height: 8em;
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
        width: auto;
        margin-right: 1em;
    }

    input[name="Skicka"] {
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
        width: 6em;
    }
</style>
