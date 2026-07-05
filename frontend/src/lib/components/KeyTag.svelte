<script>
    let { text = "" } = $props();
</script>

<span class="key-tag">
    <span class="hole"></span>
    {text}
</span>

<style>
    .key-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5em;
        font-family: "Montserrat", sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--clr-brass);
        background: hsl(42, 55%, 65%, 0.12);
        border: 1px solid hsl(42, 55%, 65%, 0.35);
        border-radius: 999px;
        padding: 0.4em 0.9em 0.4em 0.5em;
    }

    .hole {
        width: 0.7em;
        height: 0.7em;
        border-radius: 50%;
        background: var(--clr-cream);
        border: 1px solid hsl(42, 55%, 65%, 0.5);
        flex-shrink: 0;
    }
</style>
