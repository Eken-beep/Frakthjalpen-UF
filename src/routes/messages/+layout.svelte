<script lang="ts">
	import '../../app.css';
    import { page } from "$app/stores";
    import type { User, Message, Conversation } from '$lib/types';

	let { children, data } = $props();

    const conversations: Array<Conversation> = data.conversations;
    const users = data.users as Array<User>;
    const currentUser: User = data.currentUser;

    let currentConversation: Conversation | null = null;

    function name(id: string): string | undefined {
        for(const user of users) {
            if (user.id === id) return user.name;
        }
    }

    function getConversationName(c: Conversation): string {
        if (currentUser.id === c.user_a) {
            return name(c.user_b) as string;
        } else {
            return name(c.user_a) as string;
        }
    }
</script>

<div class="app">
    <nav>
        {#if conversations.length !== 0}
            <h2>Aktiva konversationer</h2>
            <hr>
        {:else}
            <p>Du har inga aktiva konversationer</p>
        {/if}
        <ul>
        {#each conversations as c}
            <li class="conversation-card"
            aria-current={$page.url.pathname.endsWith(String(c.conversation_id)) ? 'page' : undefined}
            >
                <a href="/messages/{c.conversation_id}">
                    {getConversationName(c)}
                </a>
            </li>
        {/each}
        </ul>
    </nav>

	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
        justify-content: space-between;
        border-radius: 15px;
        padding: 2em;
        margin-top: 2em;
	}

    .conversation-card {
        display: flex;
        justify-content: space-around;
        background-color: rgba(255, 255, 255, 50);
        border: none;
        border-radius: 15px;
        width: 100%;
        height: 2em;
        margin: 0;
        padding-bottom: 0.9em;
    }

    .conversation-card a {
        width: 100%;
        height: 100%;
        padding: 1em;
    }

    .conversation-card:hover {
        background-color: var(--cbg-2);
    }

    ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    hr {
        background: none;
    }

    nav {
        display: block;
        border-right: 2px solid var(--ctext);
        padding-right: 2em;
        min-width: 10vw;
    }

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
        height: 100%;
	}

    @media(max-width: 1070px) {
        .app {
            flex-direction: column;
            align-content: center;
        }

        nav {
            border: none;
            padding: 0;
            border-bottom: 2px solid var(--ctext);
            padding-bottom: 0.7em;
            width: 100%;
        }

        main {
            padding: 0;
            padding-top: 1em;
        }
    }
    </style>
