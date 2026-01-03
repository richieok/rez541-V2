<script>
    let {src = ""} = $props()
</script>

<div class="hero">
    <div class="hero-img">
        <img
            {src}
            alt="Picture of a bedroom"
        />
    </div>
    <div class="banner">
        <h2 class="m2">Welcome to</h2>
        <h1 class="m1">Residence 541</h1>
        <h2 class="m2">Your Perfect stay awaits you</h2>
        <a class="hero-button" href="/rooms">Book Now</a>
    </div>
</div>

<style>
    .hero {
        /* height: max(calc(100vh - var(--header-height)), 500px); */
        height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        display: grid;
        padding-bottom: 0.5rem;
        grid-template-columns: 1fr clamp(300px, 50%, 600px) 1fr;
        grid-template-rows: 1fr 1fr;
    }

    .hero-img {
        grid-column: 1 / span 3;
        grid-row: 1 / span 2;
        overflow: hidden;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
        }
    }

    .banner {
        grid-column: 2 / span 1;
        grid-row: 2 / span 1;
        align-self: center;
        text-align: center;
        color: white;
        line-height: 1.2;
        backdrop-filter: blur(3px);

        > h1,
        h2,
        h3,
        p {
            text-shadow: 0 0 10px black;
            /* text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.922), 0px 0 10px rgba(255, 255, 255, 0.828); */
        }
        & .m1 {
            /* font-size: 2.2rem; */
            color: white;
            font-size: clamp(2.2rem, 5vw, 3rem);
            line-height: 1.2;
        }
        & .m2 {
            /* font-size: 1rem; */
            font-size: clamp(1rem, 5vw, 2rem);
        }
    }

    .hero-button {
        display: inline-block;
        margin-top: 1em;
        padding: 1em 0.8em;
        /* background: linear-gradient(-45deg, #5638c0c6, #7b4cc66a); */
        background-color: #785bd1;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 0.5em;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.888);
        /* transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); */
        /* position: relative; */
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1;
    }

    .hero-button:any-link {
        color: white;
    }
</style>
