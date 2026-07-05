<script>
    import { resolve } from "$app/paths";
    import RoomCards from "$lib/components/RoomCards.svelte";
    import { onMount } from "svelte";
    import { preloadImages } from "$lib/utils/images.js";

    const { data } = $props();
    let rooms = $state(data.rooms);
    let imagesReady = $state(false);

    async function signImages(imgArray = []) {
        let res = await fetch("/app/signurls", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: imgArray,
            }),
        });
        if (!res.ok) {
            console.error("Failed to fetch signed URLs:", res.statusText);
            return {};
        }
        let result = await res.json();
        return result;
    }

    async function procRooms(rooms) {
        for (let room of rooms) {
            room.signedUrlObj = await signImages(room.imageList);
        }
    }

    // Wait for each room's cover photo (the only one visible before the
    // carousel is scrolled) to finish loading before revealing any cards, so
    // they don't pop in one at a time as their images download.
    async function preloadCoverImages(rooms) {
        const coverSrcs = rooms.map(
            (room) => room.signedUrlObj?.[room.imageList?.[0]],
        );
        await preloadImages(coverSrcs);
    }

    onMount(async () => {
        await procRooms(rooms);
        await preloadCoverImages(rooms);
        imagesReady = true;
    });
</script>

<svelte:head><title>Rooms & Suites</title></svelte:head>

<div class="page fade-in">
    <header class="page-header">
        <h2 class="eyebrow">Residence 541</h2>
        <h1>Rooms <em>&amp; Suites</em></h1>
        <p class="subtitle">Select a room to view details and make a reservation</p>
    </header>

    {#if imagesReady}
        <div class="room-wrapper fade-in">
            {#each rooms as aptInfo}
                <RoomCards
                    name={aptInfo.name}
                    price={aptInfo.pricePerNight}
                    id={aptInfo.id}
                    images={aptInfo.signedUrlObj
                        ? aptInfo.imageList.map(
                              (img) => aptInfo.signedUrlObj[img],
                          )
                        : []}
                />
            {/each}
        </div>
    {:else}
        <div class="room-wrapper">
            {#each rooms as _}
                <div class="room-card-skeleton">
                    <div class="skeleton-media"></div>
                    <div class="skeleton-body">
                        <div class="skeleton-line skeleton-title"></div>
                        <div class="skeleton-line skeleton-price"></div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .page {
        --gold: hsl(42, 55%, 60%);
        --ink: hsl(30, 20%, 12%);
        --cream: hsl(40, 30%, 96%);
        background: var(--cream);
        min-height: calc(100vh - var(--header-height));
        padding-bottom: 4rem;
    }

    .page-header {
        text-align: center;
        padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem 2rem;
        border-bottom: 1px solid hsl(40, 20%, 86%);
        margin-bottom: 2.5rem;
    }

    .eyebrow {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(1.6rem, 5vw, 2.8rem);
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--gold);
        margin: 0 0 0.75rem;
    }

    .page-header h1 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(2rem, 6vw, 3.5rem);
        font-weight: 800;
        color: var(--ink);
        letter-spacing: -0.02em;
        line-height: 1;
        margin: 0 0 0.75rem;
    }

    .page-header h1 em {
        font-style: italic;
        font-weight: 300;
        color: var(--gold);
    }

    .subtitle {
        font-size: 0.9rem;
        color: hsl(30, 12%, 40%);
        margin: 0;
        letter-spacing: 0.02em;
    }

    .room-wrapper {
        max-width: var(--pg-w-max);
        margin: 0 auto;
        padding: 0 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, 350px);
        justify-content: center;
        gap: 1.75rem;
    }

    .room-card-skeleton {
        width: 350px;
        background: #fff;
        border: 1px solid hsl(40, 20%, 88%);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .skeleton-media {
        aspect-ratio: 4 / 3;
    }

    .skeleton-body {
        padding: 1.1rem 1.25rem 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .skeleton-line {
        border-radius: 6px;
    }

    .skeleton-title {
        width: 60%;
        height: 1.1rem;
    }

    .skeleton-price {
        width: 35%;
        height: 0.9rem;
    }

    .skeleton-media,
    .skeleton-line {
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
</style>
