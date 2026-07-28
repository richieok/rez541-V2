<script>
    import Hero from "./Hero.svelte";
    import FeatAmenities from "./FeatAmenities.svelte";
    import LocationInfo from "$lib/components/LocationInfo.svelte";
    import KeyTag from "$lib/components/KeyTag.svelte";
    import SignedImage from "$lib/components/SignedImage.svelte";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { preloadImages } from "$lib/utils/images.js";
    import { cacheSignedUrls } from "$lib/utils/signedUrlCache.js";

    let { data } = $props();
    let { signedUrls, heroImage, collageImages, amenitiesDataArray } = data;

    let imagesReady = $state(false);
    const heroSrc = signedUrls?.[heroImage];

    // The hero URL is already signed server-side; cache it during init so
    // other pages (and <SignedImage>s) can reuse it instead of re-signing.
    if (browser) {
        cacheSignedUrls(signedUrls);
    }

    let aboutTextEl;
    let aboutTextInView = $state(false);

    onMount(async () => {
        await preloadImages([heroSrc]);
        imagesReady = true;
    });

    onMount(() => {
        // Fallback for browsers without scroll-driven animation support
        // (animation-timeline: view()), which drives .about-text in CSS.
        if (browser && !CSS.supports("animation-timeline: view()")) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        aboutTextInView = true;
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 },
            );
            observer.observe(aboutTextEl);
            return () => observer.disconnect();
        }
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
        <div
            class="about-text"
            class:in-view={aboutTextInView}
            bind:this={aboutTextEl}
        >
            <!-- <KeyTag text="The Residence" /> -->
            <p class="quote">
                <span class="mark">&ldquo;</span>At Residence 541, we believe
                our guests deserve more than just a place to stay, they deserve
                a great experience. From therapeutic spa treatments to
                personalized services, we've created a space where memories are
                made and spirits are renewed.
            </p>
        </div>
        <div class="about-collage">
            {#if collageImages?.[0]}
                <figure class="collage-a">
                    <SignedImage
                        src={collageImages[0]}
                        alt="Living room in a three-bedroom suite"
                        class="fade-in"
                    />
                </figure>
            {/if}
            {#if collageImages?.[1]}
                <figure class="collage-b">
                    <SignedImage
                        src={collageImages[1]}
                        alt="Exterior view of Residence 541, Block One"
                        class="fade-in"
                    />
                </figure>
            {/if}
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
        background: linear-gradient(
            90deg,
            hsl(40, 20%, 92%) 25%,
            hsl(40, 25%, 96%) 50%,
            hsl(40, 20%, 92%) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s ease-in-out infinite;
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
        opacity: 0.5;
        scale: 0.9;
        transition:
            opacity 0.6s ease,
            scale 0.6s ease;
    }

    .about-text.in-view {
        opacity: 1;
        scale: 1;
    }

    @supports (animation-timeline: view()) {
        .about-text {
            transition: none;
            animation: about-text-reveal ease-in both;
            animation-timeline: view();
            animation-range: entry 0% entry 100%;
        }
    }

    @keyframes about-text-reveal {
        from {
            opacity: 0.5;
            scale: 0.9;
        }
        to {
            opacity: 1;
            scale: 1;
        }
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

    /* :global() so the rules reach the <img> rendered inside SignedImage. */
    .about-collage :global(img) {
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
