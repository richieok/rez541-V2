<script>
    import Hero from "./Hero.svelte";
    import FeatAmenities from "./FeatAmenities.svelte";
    import LocationInfo from "$lib/components/LocationInfo.svelte";
    import KeyTag from "$lib/components/KeyTag.svelte";
    import { onMount } from "svelte";
    import { preloadImages } from "$lib/utils/images.js";
    import { cacheSignedUrls } from "$lib/utils/signedUrlCache.js";

    let { data } = $props();
    let { signedUrls, amenitiesDataArray } = data;

    let imagesReady = $state(false);
    const heroSrc = signedUrls?.["public/spa/reception3.jpg"];
    const livingRoomSrc = signedUrls?.["public/3-bed-suite/living-room-3-bed.jpg"];
    const exteriorSrc = signedUrls?.["public/exterior/block1-view-800w.jpg"];

    onMount(async () => {
        // These URLs are already signed server-side; cache them so other
        // pages (e.g. /rooms) can reuse them instead of re-signing.
        cacheSignedUrls(signedUrls);
        await preloadImages([heroSrc, livingRoomSrc, exteriorSrc]);
        imagesReady = true;
    });
</script>

<svelte:head><title>Home</title></svelte:head>
<div class="page fade-in">
    {#if imagesReady}
        <div class="fade-in">
            <Hero src={heroSrc} />
        </div>
    {:else}
        <div class="hero-skeleton"></div>
    {/if}

    <section class="about" id="about">
        <div class="about-text">
            <KeyTag text="The Residence" />
            <p class="quote">
                <span class="mark">&ldquo;</span>At Residence 541, we believe our
                guests deserve more than just a place to stay, they deserve a
                great experience. From therapeutic spa treatments to
                personalized services, we've created a space where memories
                are made and spirits are renewed.
            </p>
        </div>
        <div class="about-collage">
            <figure class="collage-a">
                {#if imagesReady}
                    <img
                        src={livingRoomSrc}
                        alt="Living room in a three-bedroom suite"
                        class="fade-in"
                    />
                {:else}
                    <div class="skeleton-block"></div>
                {/if}
            </figure>
            <figure class="collage-b">
                {#if imagesReady}
                    <img
                        src={exteriorSrc}
                        alt="Exterior view of Residence 541, Block One"
                        class="fade-in"
                    />
                {:else}
                    <div class="skeleton-block"></div>
                {/if}
            </figure>
        </div>
    </section>

    <section class="amenities-section" id="amenities">
        <div class="section-head">
            <KeyTag text="Amenities" />
            <h2>Everything you need, close at hand.</h2>
        </div>
        <div class="max-w">
            <FeatAmenities cardDataArray={amenitiesDataArray} />
        </div>
    </section>

    <section class="location-section" id="find-us">
        <div class="max-w">
            <LocationInfo />
        </div>
    </section>
</div>

<style>
    .page {
        background: var(--clr-cream);
    }

    .hero-skeleton {
        max-width: var(--pg-w-max);
        height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        margin: 0 auto;
        box-sizing: border-box;
    }

    .hero-skeleton,
    .skeleton-block {
        background: linear-gradient(
            90deg,
            hsl(40, 20%, 92%) 25%,
            hsl(40, 25%, 96%) 50%,
            hsl(40, 20%, 92%) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s ease-in-out infinite;
    }

    .skeleton-block {
        width: 100%;
        height: 100%;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    .about {
        max-width: var(--pg-w-max);
        margin: 0 auto;
        padding: 4rem 1.5rem 5rem;
        display: grid;
        gap: 3rem;
    }

    .about-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.4rem;
    }

    .quote {
        font-family: var(--font-display);
        font-optical-sizing: auto;
        font-size: clamp(1.3rem, 2.4vw, 1.7rem);
        font-weight: 400;
        font-style: italic;
        line-height: 1.5;
        color: var(--clr-ink);
        margin: 0;
        max-width: 46ch;
    }

    .mark {
        font-family: var(--font-display);
        font-style: normal;
        font-size: 2.2rem;
        color: var(--clr-gold);
        line-height: 0;
        vertical-align: -0.35em;
        margin-right: 0.05em;
    }

    .about-collage {
        position: relative;
        aspect-ratio: 5 / 4;
        margin-bottom: 2rem;
    }

    .about-collage figure {
        margin: 0;
        position: absolute;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 20px 40px hsl(30, 20%, 15%, 0.16);
    }

    .collage-a {
        top: 0;
        left: 0;
        width: 76%;
        aspect-ratio: 4 / 3;
    }

    .collage-b {
        bottom: -2rem;
        right: 0;
        width: 50%;
        aspect-ratio: 4 / 3;
        border: 5px solid var(--clr-cream);
        z-index: 1;
    }

    .about-collage img,
    .about-collage .skeleton-block {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .amenities-section {
        background: var(--clr-cream-deep);
        padding: 4rem 1.5rem;
    }

    .section-head {
        max-width: var(--pg-w-max);
        margin: 0 auto 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.9rem;
        text-align: center;
    }

    .section-head h2 {
        font-family: var(--font-display);
        font-size: clamp(1.6rem, 3.5vw, 2.2rem);
        font-weight: 600;
        color: var(--clr-ink);
        margin: 0;
    }

    .location-section {
        padding: 4rem 1.5rem 5rem;
    }

    .max-w {
        max-width: var(--pg-w-max);
        margin: 0 auto;
    }

    @container (width > 700px) {
        .about {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 4rem;
        }
    }
</style>
