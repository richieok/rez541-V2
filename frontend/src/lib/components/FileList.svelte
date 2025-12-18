<script>
    let { filenames = [] } = $props()
</script>

<ul>
    {#each filenames as fname}
        <li>{fname}</li>
    {/each}
</ul>

<style>
    li {
        font-size: 0.5rem;
    }
</style>