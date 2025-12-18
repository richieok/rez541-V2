<script>
    import Carousel from "./Carousel.svelte";
    let { name = "Room Title", images = [], price = "100,000", id } = $props();

    
</script>

<div class="room-card">
    <h2>{name}</h2>
    <Carousel {images} {id}/>
    <h3>{price} / night</h3>
</div>


<style>
    .room-card {
        grid-template-rows: auto auto 1fr;
        width: 350px;
        height: 480px;
        background-color: lightgray;
        font-family: "Poppins", sans-serif;

        > h1,
        h2,
        h3,
        p {
            padding: 0 1rem;
        }
        h2 {
            font-weight: 400;
        }
        h3 {
            font-weight: 400;
        }
    }
</style>
