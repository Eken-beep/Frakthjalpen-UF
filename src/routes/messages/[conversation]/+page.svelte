<script lang="ts">
    import '../../../app.css';
    import { redirect } from "@sveltejs/kit";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import type { Message, Conversation } from "$lib/types";

    import paperplane from "$lib/images/paper-plane.svg";

    let { data } = $props();
    let conversation: Conversation = data.conversation[0] as Conversation;
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
        <form action="?/modify" method="POST" class="modify-conversation-desktop" use:enhance={
            async ({ formData: formData }) => {
                const action = formData.get("cc")!;
                if (action === "Avsluta")
                    redirect(308, "/");
            }
        }>
            <input class="cc" type="submit" name="complete" value="Acceptera & betala">
            <input class="cc" type="submit" name="end" value="Avbryt">
        </form>
        <form action="?/send" method="POST" data-sveltekit-keepfocus>
            <input name="textmessage" type="text" class="textbox" placeholder="Meddelande">
            <button type="submit" name="Skicka" value="" class="send">
                <img src={paperplane} alt="skicka" width="100%">
            </button>
        </form> 
    </div>
</div>

<style>
    * {
        --message-send-height: 5em;
    }
    .messages {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        min-height: calc(100% - var(--message-send-height));
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
        height: var(--message-send-height);
    }

    .message-send form {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    form[action="?/send"] {
        width: 70%;
    }

    .message-send form input[name="textmessage"] {
        padding-left: 1em;
        padding-right: 1em;
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
        width: 100%;
        margin-right: 1em;
    }
    .message-send form input[name="textmessage"]::placeholder {
        color: var(--ctext2);
    }

    button.send {
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
        width: 2.8em;
        height: 100%;
        padding: 0.1em;
    }

    input.cc {
        border: 2px solid rgba(100, 100, 100, 0.3);
        border-radius: 15px;
        margin-right: 0.5em;
    }

    @media(max-width: 1070px) {
        .messages {
            height: 70vh;
        }

        .conversation {
            width: 100%;
        }

        .modify-conversation-desktop {
            display: none;
        }

        input[name="textmessage"] {
            width: 80vw;
        }

        .message-send {
            display: block;
        }

        .cc {
            margin-bottom: 5px;
        }

        form[action="?/send"] {
            width: 100%;
        }
    }
</style>
