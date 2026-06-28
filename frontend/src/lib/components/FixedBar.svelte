<script>
    let { children } = $props();
</script>

<div class="fixed-bar">
    {@render children()}
</div>

<style>
    .fixed-bar {
        position: sticky;
        bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        width: fit-content;
        margin: 2rem auto 0;
        padding: 0.9rem 1.5rem;
        background: hsl(30, 20%, 12%);
        border-radius: 50px;
        box-shadow: 0 8px 32px hsl(30, 20%, 8%, 0.35);
        color: white;
        line-height: 1;
    }
</style>