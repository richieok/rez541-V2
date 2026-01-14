<script>
    import AmenityCard from "./AmenityCard.svelte";
    let { cardDataArray = [] } = $props();
</script>

<div>
    {#each cardDataArray as cardData}
        <AmenityCard {...cardData}/>
    {/each}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(auto-fit, 250px);
        grid-template-rows: auto auto auto;
        padding: 2rem 1rem;
        gap: 3rem;
        justify-content: center;
    }
</style>
