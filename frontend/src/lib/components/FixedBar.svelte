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
        bottom: 0px;
        width: 100%;
        background-color: var(--color-primary);
        /* color: white; */
        padding: 1rem;
        text-align: center;
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }
</style>