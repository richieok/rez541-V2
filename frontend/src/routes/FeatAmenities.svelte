<script>
    import AmenityCard from "./AmenityCard.svelte";
    let { cardDataArray = [] } = $props();
</script>

<div class="amenities-list">
    {#each cardDataArray as cardData}
        <AmenityCard {...cardData} />
    {/each}
</div>

<style>
    .amenities-list {
        display: grid;
        grid-template-columns: 1fr;
        border-top: 1px solid var(--clr-hairline);
    }

    @container (width > 640px) {
        .amenities-list {
            grid-template-columns: repeat(2, 1fr);
        }
        .amenities-list > :global(.amenity-card:nth-child(odd)) {
            border-right: 1px solid var(--clr-hairline);
        }
    }
</style>
