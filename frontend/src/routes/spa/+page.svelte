<script>
    const { data } = $props();
    
</script>

<div class="page-wrapper">
    <h2>Spa</h2>
</div>

<style>
    .page-wrapper {
        --pg-height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        min-height: var(--pg-height);
        --gap: 1rem;
        padding: var(--gap) 0;
    }
</style>
