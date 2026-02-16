<script>
    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<style>
    div {
        position: sticky;
        display: flex;
        gap: 2rem;
        place-content: center;
        bottom: 1rem;
        width: fit-content;
        /* background-color: oklch(from var(--header-background) calc(l + 20%) c h); */
        background-color: var(--header-background);
        color: white;
        margin: 1rem auto 0;
        padding: 1rem;
        text-align: center;
        line-height: 1;
        /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); */
    }
</style>