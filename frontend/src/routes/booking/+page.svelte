<script>
    import { browser } from "$app/environment";
    import ActionButton from "$lib/components/ActionButton.svelte";

    let { form, data } = $props();

    let { rooms, roomId } = data;
    let selected = $state();
    let dispForm = $state(true);

    if (browser) {
        selected = roomId ? parseInt(roomId) : "";
    }

    if (browser && form?.success) {
        dispForm = false;
    }
</script>

<div class="page fade-in">
    <a href="/room/{roomId}" class="back-link">&#8592; Back</a>
    {#if dispForm}
        <form method="post">
            <div class="inputs">
                <label for="roomType">Room Type</label>
                <select name="roomType" required bind:value={selected}>
                    <option value="" disabled>Select Room Type</option>
                    {#each rooms as room}
                        <option value={room.id}>{room.name}</option>
                    {/each}
                </select>
                <label for="firstName">Firstname</label>
                <input type="text" name="firstName" placeholder="Firstname" />
                <label for="lastName">Lastname</label>
                <input type="text" name="lastName" placeholder="Lastname" />
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Email" />
                <label for="phone">Phone</label>
                <input type="tel" name="phone" placeholder="Phone" />
                <label for="check-in">Check-in Date</label>
                <input
                    type="date"
                    placeholder="Check-in Date"
                    name="check-in"
                />
                <label for="check-out">Check-out Date</label>
                <input
                    type="date"
                    placeholder="Check-out Date"
                    name="check-out"
                />
            </div>
            <div class="button-container">
                <button type="submit">Book Now</button>
            </div>
        </form>
    {/if}
    {#if form?.message}
        <h2>{form.message}</h2>
    {/if}
</div>

<style>
    .page {
        min-height: 100vh;
        padding-top: 1rem;
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
        color: hsl(30, 20%, 12%);
        padding: 1rem 0.7rem 0;
        opacity: 0.6;
        transition: opacity 0.2s;
    }

    .back-link:hover {
        opacity: 1;
    }
    form {
        max-width: 500px;
        margin: 0 auto;
        container-type: inline-size;
    }
    .inputs {
        display: grid;
        /* grid-template-columns: 100px 1fr; */
        gap: 1rem;
        padding: 0.7rem;
    }
    select {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-transform: capitalize;
    }
    label {
        align-content: center;
    }
    input {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        padding: clamp(0.5rem, 2.5vw, 0.8rem) 0.5rem;
        font-size: clamp(1.2rem, 2.5vw, 1.6rem);
        --test-color: oklch(0.84 0.12 83.48);
        background-color: var(--test-color);
        box-shadow: 10px 10px 30px -10px rgba(0, 0, 0, 0.888);
        /* box-shadow: 0 8px 10px rgba(0, 0, 0, 0.888); */
        /* color: white; */
        border-radius: 6px;
        text-transform: uppercase;
        cursor: pointer;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        transition: all .5s;
        /* margin: 1rem; */
    }
    button:hover {
        /* background-color: oklch( from var(--test-color) calc( l + 0.1 ) calc( c + 0.01 ) calc( h - 10 ) ); */
        box-shadow: 2px 2px 20px -3px rgba(0, 0, 0, 0.888);
    }
    .button-container {
        display: flex;
        justify-content: end;
        padding: 1rem;
    }

    @container (width > 499px) {
        .inputs {
            grid-template-columns: 100px 1fr;
        }
    }
</style>
