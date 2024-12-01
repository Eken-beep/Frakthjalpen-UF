<script lang="ts">
    import "./postList.css";
    import type { Post } from "$lib/types";

    let { post }: { post: Post } = $props();
    let stateText: string = $state("");
    switch (post.state) {
        case "normal":
            stateText = "Inget har hänt än"
            break;
        case "waiting":
            stateText = "Väntar på att betalas";
            break;
        case "paid":
            stateText = "Betalt och godkänd av båda, nu är det bara för fraktaren att frakta paketet";
            break;
        default:
            stateText = "";
    }
</script>

<h1>{post.title}</h1>
<div class="description">
    {post.description}
</div>
<div class="location">
    <span>Från {post.startLocation.adress}</span>
    <span>Till {post.endLocation.adress}</span>
</div>
<h2>{post.price}kr</h2>
<div class="descriptor">
    {stateText}
</div>
