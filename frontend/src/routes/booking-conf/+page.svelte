<script>
    let { data } = $props();
    let { bookingData } = data;
</script>

<div class="page">
    <h1>Booking confirmation</h1>
    <h2 data-success="{bookingData.success}">{bookingData.message}</h2>

</div>

<style>
    .page {
        min-height: 100vh;
    }
</style>