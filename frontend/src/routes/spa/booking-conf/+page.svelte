<script>
    let { data } = $props();
    let { bookingData } = data;
</script>

<svelte:head>
    <title>Spa Booking Confirmation - Residence 541</title>
</svelte:head>

<div class="page">
    <p class="eyebrow">Residence 541 Spa</p>
    <h1>Booking confirmation</h1>
    <h2 class:failed={!bookingData.success}>{bookingData.message}</h2>
    <a href="/spa" class="back-link">Back to the spa</a>
</div>

<style>
    .page {
        --gold-deep: hsl(42, 50%, 45%);
        --ink: hsl(30, 20%, 12%);
        --ink-soft: hsl(30, 12%, 30%);
        --cream: hsl(40, 30%, 96%);
        min-height: 100vh;
        background: var(--cream);
        color: var(--ink);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem 1.25rem;
        font-family: "Montserrat", sans-serif;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: 0.75rem;
        color: var(--gold-deep);
        margin: 0 0 0.75rem;
    }

    h1 {
        font-weight: 500;
        margin: 0 0 1rem;
    }

    h2 {
        font-weight: 400;
        font-size: 1.1rem;
        color: var(--ink-soft);
        margin: 0;
    }

    h2.failed {
        color: hsl(0, 55%, 40%);
    }

    .back-link {
        margin-top: 2rem;
        color: var(--gold-deep);
    }
</style>
