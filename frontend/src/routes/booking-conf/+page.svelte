<script>
    let { data } = $props();
    let { bookingData } = data;
</script>

<h1>Booking confirmation</h1>
<h2 data-success="{bookingData.success}">{bookingData.message}</h2>

<style>
    
</style>