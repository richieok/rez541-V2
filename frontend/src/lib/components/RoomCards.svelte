<script>
    import Carousel from "./Carousel.svelte";
    let { name = "Room Title", images = [], price = "100,000", id } = $props();
</script>

<div class="room-card">
    <h2>{name}</h2>
    <Carousel {images} {id} />
    <h3>&#8358;{price} / Night</h3>
</div>

<style>
    .room-card {
        grid-template-rows: auto auto 1fr;
        width: 350px;
        height: 480px;
        background-color: oklch(0.97 0 0);
        border: 1px solid lch(76 0.22 269.9 / 0.74);
        border-radius: 10px;

        h2,
        h3 {
            padding: 0 1rem;
        }
        h2 {
            font-weight: 500;
            text-transform: capitalize;
            margin: 1rem 0;
        }
        h3 {
            font-weight: 400;
        }
    }
</style>
