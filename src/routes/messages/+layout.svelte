<script lang="ts">
	import '../../app.css';
    import type { User, Message, Conversation } from '$lib/types';

	let { children, data } = $props();

    const conversations: Array<Conversation> = data.conversations;
    const users = data.users as Array<User>;
    const currentUser = data.currentUser;

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
        <h2>Aktiva konversationer</h2>
        <hr>
        {#each conversations as c}
            <div class="conversation-card">
                <span>{getConversationName(c)}</span>
            </div>
        {/each}
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
	}

    .conversation-card {
        background-color: rgba(255, 255, 255, 50);
        
    }

    nav {
        border-right: 2px solid var(--ctext);
        padding-right: 2em;
    }

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
