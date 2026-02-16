<script>
    import FixedBar from "$lib/components/FixedBar.svelte";
    import ActionButton from "$lib/components/ActionButton.svelte";
    let { data } = $props();
    let room = data.room;
</script>

<svelte:head><title>{room.name}</title></svelte:head>
<div class="page-wrapper fade-in">
    <div class="gallery">
        {#if room?.imageList.length > 0}
            {#each room.imageList as uri}
                <div>
                    <img src={room.signedUrls[uri]} alt="" />
                </div>
            {/each}
        {/if}
    </div>
    <FixedBar>
        <h1>{room.name}</h1>
        <!-- <a class="book-button" href="/booking?roomId={room.id}">Book Now</a> -->
        <ActionButton href="/booking?roomId={room.id}" text="Book Now" />
    </FixedBar>
</div>

<style>
    .page-wrapper {
        --pg-height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        min-height: var(--pg-height);
        --gap: 1rem;
        gap: var(--gap);
        padding: var(--gap);
        container-type: inline-size;
    }
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
        justify-content: center;
        gap: 1rem;
    }
    .gallery img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
    }
    .book-button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
    }
    .book-button:hover {
        background-color: #0056b3;
    }
    h1 {
        text-transform: capitalize;
        font-size: clamp(1.3rem, 3vw, 2rem);
        align-content: center;
    }
</style>
