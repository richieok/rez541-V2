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

<svelte:head><title>Bookings</title></svelte:head>
<div class="room-wrapper fade-in">
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

<style>
    .room-wrapper {
        max-width: var(--pg-w-max);
        margin: 0 auto;
        padding-top: 1em;
        --pg-height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        min-height: var(--pg-height);
        --gap: 1rem;
        gap: var(--gap);
        padding: var(--gap) 0;
        container-type: inline-size;

        display: grid;
        grid-template-columns: repeat(auto-fit, 350px);
        justify-content: center; /* centers the grid */
    }
</style>
