<script>
    import { browser } from "$app/environment";

    let { form } = $props();
    let dispForm = true;

    if (browser && form?.success) {
        dispForm = false;
    }
</script>

<div class="page">
    <h1>Booking</h1>
    {#if dispForm}
        <form action="?/startBooking" method="post">
            <div class="inputs">
                <label for="firstname">Firstname</label>
                <input type="text" name="firstname" placeholder="Firstname" />
                <label for="lastname">Lastname</label>
                <input type="text" name="lastname" placeholder="Lastname" />
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Email" />
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
            <button type="submit">Book Now</button>
        </form>
    {/if}
</div>

<style>
    .page {
        min-height: 100vh;
    }
    form {
        max-width: 500px;
        margin: 0 auto;
    }
    .inputs {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 1rem;
    }
    input {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        padding: 0.75rem;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 1rem;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
