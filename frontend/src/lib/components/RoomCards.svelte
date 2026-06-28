<script>
    import Carousel from "./Carousel.svelte";
    let { name = "Room Title", images = [], price = "100,000", id } = $props();
</script>

<div class="room-card">
    <div class="card-media">
        <Carousel {images} {id} />
    </div>
    <div class="card-body">
        <div class="card-info">
            <h2>{name}</h2>
            <p class="price">&#8358;{price}<span class="per">/night</span></p>
        </div>
        <a href="/room/{id}" class="book-btn">View Room</a>
    </div>
</div>

<style>
    .room-card {
        width: 350px;
        background: #fff;
        border: 1px solid hsl(40, 20%, 88%);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: box-shadow 0.25s, transform 0.25s;
    }

    .room-card:hover {
        box-shadow: 0 8px 32px hsl(30, 20%, 15%, 0.1);
        transform: translateY(-3px);
    }

    .card-media {
        aspect-ratio: 4 / 3;
        overflow: hidden;
    }

    .card-body {
        padding: 1.1rem 1.25rem 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .card-info {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        text-transform: capitalize;
        color: hsl(30, 20%, 12%);
        margin: 0;
        letter-spacing: -0.01em;
    }

    .price {
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: hsl(42, 55%, 52%);
        margin: 0;
    }

    .per {
        font-size: 0.72rem;
        font-weight: 500;
        color: hsl(30, 12%, 45%);
        margin-left: 0.2rem;
    }

    .book-btn {
        flex-shrink: 0;
        font-family: "Montserrat", sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        color: hsl(30, 20%, 12%);
        background: hsl(42, 55%, 60%);
        border-radius: 8px;
        padding: 0.6rem 1rem;
        transition: background 0.2s, transform 0.15s;
    }

    .book-btn:hover {
        background: hsl(42, 55%, 52%);
        transform: scale(1.03);
    }
</style>
