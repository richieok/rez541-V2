<script>
    import FixedBar from "$lib/components/FixedBar.svelte";
    let { data } = $props();
    let room = data.room;
    console.log(room);
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
        <a class="book-button" href="/booking?roomId={room.id}">Book Now</a>
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
</style>
