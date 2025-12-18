<script>
    import { resolve } from "$app/paths";
    import RoomCards from "$lib/components/RoomCards.svelte";
    import { onMount } from "svelte";

    const { data } = $props();
    let rooms = $state(data.rooms);
    $inspect(rooms, "rooms in +page.svelte");

    async function onPageLoad() {
        try {
            for (let room of rooms) {
                console.log($state.snapshot(room.imageList));
                const res = await fetch("/app/signurls", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uris: room.imageList,
                    }),
                });
                if (res.ok) {
                    console.log("res.ok");
                    const signedUrlsObj = await res.json();
                    room.signedUrls = signedUrlsObj;
                } else {
                    console.log(res.status);
                    let { error } = await res.json();
                    console.log(`error: ${error}`);
                }
            }
            rooms.forEach((room) => {
                console.log($state.snapshot(room.imageList));
                // let images = room.imageList.map( img => img.length )
                let signdImgList = room.imageList.map((img) => {
                    return room.signedUrls[img];
                });
                room.signdImgList = signdImgList;
                console.log(signdImgList);
            });
            console.log($state.snapshot(rooms));
        } catch (error) {
            console.log("Error");
            throw new Error("onPageLoad function failed");
        }
    }

    onMount(async () => {
        const id = setTimeout(async () => {
            await onPageLoad();
            clearTimeout(id);
        }, 2000);
        return () => clearTimeout(id);
    });
</script>

<svelte:head><title>Bookings</title></svelte:head>
<button onclick={onPageLoad}>CLick</button>
<div class="room-wrapper fade-in">
    {#each rooms as aptInfo}
        <RoomCards
            name={aptInfo.name}
            price={aptInfo.pricePerNight}
            id={aptInfo.id}
            images={aptInfo.signdImgList}
        />
    {/each}
</div>

<style>
    .room-wrapper {
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
