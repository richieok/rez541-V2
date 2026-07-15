<script>
    import FixedBar from "$lib/components/FixedBar.svelte";
    import ActionButton from "$lib/components/ActionButton.svelte";
    import SignedImage from "$lib/components/SignedImage.svelte";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { preloadImages } from "$lib/utils/images.js";
    import { cacheSignedUrls } from "$lib/utils/signedUrlCache.js";
    let { data } = $props();
    let room = data.room;
    let imagesReady = $state(false);

    // These URLs are already signed server-side; cache them during init,
    // before the gallery's <SignedImage>s mount, so they render straight
    // from cache (and the /rooms listing can reuse them too).
    if (browser) {
        cacheSignedUrls(room?.signedUrls);
    }

    onMount(async () => {
        const srcs = (room?.imageList ?? []).map((uri) => room.signedUrls[uri]);
        await preloadImages(srcs);
        imagesReady = true;
    });
</script>

<svelte:head><title>{room.name}</title></svelte:head>

<div class="page-wrapper fade-in">
    <a href="/rooms" class="back-link">&#8592; All Rooms</a>

    <header class="room-header">
        <p class="eyebrow">Residence 541</p>
        <h1>{room.name}</h1>
    </header>

    {#if imagesReady}
        <div class="gallery fade-in">
            {#if room?.imageList.length > 0}
                {#each room.imageList as uri}
                    <div class="gallery-item">
                        <SignedImage src={uri} alt={room.name} />
                    </div>
                {/each}
            {/if}
        </div>
    {:else}
        <div class="gallery">
            {#each room?.imageList ?? [] as _}
                <div class="gallery-item-skeleton"></div>
            {/each}
        </div>
    {/if}

    <FixedBar>
        <span class="bar-name">{room.name}</span>
        <ActionButton href="/booking?roomId={room.id}" text="Book Now" />
    </FixedBar>
</div>

<style>
    .page-wrapper {
        --gold: hsl(42, 55%, 60%);
        --ink: hsl(30, 20%, 12%);
        --cream: hsl(40, 30%, 96%);
        background: var(--cream);
        min-height: calc(100vh - var(--header-height));
        padding: 0 1.25rem 8rem;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--ink);
        padding: 1rem 0 0;
        opacity: 0.6;
        transition: opacity 0.2s;
    }

    .back-link:hover {
        opacity: 1;
    }

    .room-header {
        text-align: center;
        padding: clamp(2rem, 5vw, 3.5rem) 1rem 2rem;
        border-bottom: 1px solid hsl(40, 20%, 86%);
        margin-bottom: 2rem;
    }

    .eyebrow {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(1.6rem, 5vw, 2.8rem);
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--gold);
    }

    h1 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(1.8rem, 5vw, 3rem);
        font-weight: 700;
        text-transform: capitalize;
        color: var(--ink);
        letter-spacing: -0.02em;
        margin: 0;
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    /* :global() so the rules reach the <img> rendered inside SignedImage. */
    .gallery-item :global(img) {
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 10px;
        display: block;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover :global(img) {
        transform: scale(1.02);
    }

    .gallery-item {
        overflow: hidden;
        border-radius: 10px;
    }

    .gallery-item-skeleton {
        width: 100%;
        aspect-ratio: 4 / 3;
        border-radius: 10px;
        background: linear-gradient(
            90deg,
            hsl(40, 20%, 92%) 25%,
            hsl(40, 25%, 96%) 50%,
            hsl(40, 20%, 92%) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    .bar-name {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        font-weight: 600;
        text-transform: capitalize;
        color: #fff;
    }
</style>
