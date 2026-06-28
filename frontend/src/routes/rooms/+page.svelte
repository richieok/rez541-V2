<script>
    import { resolve } from "$app/paths";
    import RoomCards from "$lib/components/RoomCards.svelte";
    import { onMount } from "svelte";

    const { data } = $props();
    let rooms = $state(data.rooms);

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

    onMount(async () => {
        await procRooms(rooms);
        // console.log($state.snapshot(rooms));
        // console.log(
        //     rooms[0].imageList.map((img) => rooms[0].signedUrlObj[img]),
        // );
    });
</script>

<svelte:head><title>Rooms & Suites</title></svelte:head>

<div class="page fade-in">
    <header class="page-header">
        <h2 class="eyebrow">Residence 541</h2>
        <h1>Rooms <em>&amp; Suites</em></h1>
        <p class="subtitle">Select a room to view details and make a reservation</p>
    </header>

    <div class="room-wrapper">
        {#each rooms as aptInfo}
            <RoomCards
                name={aptInfo.name}
                price={aptInfo.pricePerNight}
                id={aptInfo.id}
                images={aptInfo.signedUrlObj
                    ? aptInfo.imageList.map((img) => aptInfo.signedUrlObj[img])
                    : []}
            />
        {/each}
    </div>
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
</style>
