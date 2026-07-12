<script>
    import { onMount } from "svelte";
    import { preloadImages } from "$lib/utils/images.js";
    import { cacheSignedUrls } from "$lib/utils/signedUrlCache.js";

    let { data } = $props();
    let { signedUrls } = data;

    let imagesReady = $state(false);
    const heroSrc = signedUrls?.["public/spa/scrub-room.jpg"];
    const lotusSrc = signedUrls?.["public/spa/spa-lotus-plain.svg"];
    const livingRoomSrc = signedUrls?.["public/spa/living-room.jpg"];
    const scrubShotSrc = signedUrls?.["public/spa/scrub-room-shot.jpg"];
    const scrubRoom2Src = signedUrls?.["public/spa/scrub-room2.jpg"];
    const galleryImages = [livingRoomSrc, scrubShotSrc, scrubRoom2Src];

    // Mirrors the categories on /spa/service-menu - keep the copy in sync
    // with that page's section-sub taglines if they change.
    const serviceCategories = [
        {
            id: "treatments",
            icon: "fa-solid fa-hand-holding-medical",
            title: "Massage & Body Treatments",
            description:
                "Massage therapies for deep rest and recovery, from Swedish and deep tissue to hot stone and four-hands.",
        },
        {
            id: "facials",
            icon: "fa-solid fa-water",
            title: "Spa Facials",
            description:
                "Targeted skin treatments for a radiant complexion, tailored to your skin type.",
        },
        {
            id: "waxing",
            icon: "fa-solid fa-feather",
            title: "Waxing",
            description:
                "Professional hair removal with lasting results, from a quick tidy-up to full body.",
        },
        {
            id: "nails",
            icon: "fa-solid fa-hand-sparkles",
            title: "Nail Care",
            description:
                "Manicures, pedicures and finishing treatments, including our signature 541 rituals.",
        },
        {
            id: "packages",
            icon: "fa-solid fa-gift",
            title: "Packages",
            description:
                "Curated rituals for total restoration, pairing thermal recovery, massage and more into one retreat.",
        },
        {
            id: "hammam",
            icon: "fa-solid fa-mosque",
            title: "Moroccan Hammam",
            description:
                "Ancient cleansing rituals reimagined, from a traditional hammam to a brightening body wrap.",
        },
        {
            id: "wellness",
            icon: "fa-solid fa-heart-pulse",
            title: "Health & Wellness",
            description:
                "Holistic programmes for mind, body and vitality, including yoga and nutrition counselling.",
        },
    ];

    onMount(async () => {
        // These URLs are already signed server-side; cache them so other
        // pages can reuse them instead of re-signing.
        cacheSignedUrls(signedUrls);
        await preloadImages([heroSrc, lotusSrc, ...galleryImages]);
        imagesReady = true;
    });
</script>

<div class="page-wrapper fade-in">
    {#if imagesReady}
        <section class="s-hero fade-in">
            <div class="bg-img"><img src={heroSrc} alt="" /></div>
            <div class="overlay"></div>
            <div class="hero-content">
                <img class="lotus" src={lotusSrc} alt="" />
                <p class="eyebrow">Spa &amp; Wellness</p>
                <!-- <h1>Spa &amp; <em>Wellness</em></h1> -->
                <h1>The Spa <em>@ 541</em></h1>
                <p class="tagline">A sanctuary of rest, ritual & renewal.</p>
                <a class="book-cta" href="/spa/booking">Book Now</a>
            </div>
        </section>
    {:else}
        <div class="hero-skeleton"></div>
    {/if}

    <div class="gallery">
        {#each galleryImages as src}
            <div class="gallery-item">
                {#if imagesReady}
                    <img {src} alt="" class="fade-in" />
                {:else}
                    <div class="skeleton-block"></div>
                {/if}
            </div>
        {/each}
    </div>

    <section class="services">
        <div class="services-head">
            <p class="eyebrow dark">Our Services</p>
            <h2>Every treatment, close at hand.</h2>
        </div>
        <div class="services-grid">
            {#each serviceCategories as category}
                <a class="service-card" href="/spa/service-menu#{category.id}">
                    <div class="service-icon">
                        <i class={category.icon}></i>
                    </div>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <span class="service-link">View Menu &rarr;</span>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    /* ── Page ─────────────────────────────────────────── */
    .page-wrapper {
        --gold: hsl(42, 55%, 60%);
        --gold-light: hsl(42, 55%, 78%);
        --ink: hsl(30, 20%, 12%);
        --ink-soft: hsl(30, 12%, 30%);
        --cream: hsl(40, 30%, 96%);
        --rule: hsl(40, 20%, 86%);
        --section-gap: clamp(4rem, 8vw, 7rem);

        background: var(--cream);
        color: var(--ink);
        min-height: 100vh;
    }

    /* ── Hero ─────────────────────────────────────────── */
    .s-hero {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: clamp(420px, 60vh, 680px);
        overflow: hidden;
        background: var(--ink);
        text-align: center;
    }

    .bg-img {
        position: absolute;
        inset: 0;
    }

    .bg-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.35;
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            transparent 40%,
            hsl(30, 20%, 8%, 0.7) 100%
        );
    }

    .hero-content {
        position: relative;
        z-index: 1;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.6rem;
        animation: hero-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes hero-rise {
        from {
            opacity: 0;
            transform: translateY(24px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* ── Loading skeletons ────────────────────────────── */
    .hero-skeleton {
        min-height: clamp(420px, 60vh, 680px);
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

    /* ── Gallery ──────────────────────────────────────── */
    .gallery {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        max-width: var(--pg-w-max, 1200px);
        margin: 0 auto;
        padding: var(--section-gap) 1.5rem;
    }

    .gallery-item {
        aspect-ratio: 4 / 3;
        border-radius: 10px;
        overflow: hidden;
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    @media (min-width: 700px) {
        .gallery {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .lotus {
        width: clamp(40px, 7vw, 70px);
        opacity: 0.85;
        filter: invert(1) sepia(1) saturate(0.5) hue-rotate(5deg)
            brightness(1.3);
        margin-bottom: 0.4rem;
    }

    .eyebrow {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(0.6rem, 1.5vw, 0.75rem);
        font-weight: 600;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: var(--gold-light);
        margin: 0;
    }

    .hero-content h1 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(3.5rem, 10vw, 7rem);
        font-weight: 800;
        line-height: 1;
        color: #fff;
        letter-spacing: -0.02em;
        margin: 0;
    }

    .hero-content h1 em {
        font-style: italic;
        font-weight: 300;
        color: var(--gold-light);
    }

    .tagline {
        font-size: clamp(0.85rem, 2vw, 1rem);
        color: hsl(40, 20%, 75%);
        letter-spacing: 0.05em;
        margin: 0;
    }

    .book-cta {
        display: inline-block;
        margin-top: 1.75rem;
        padding: 0.8rem 2.5rem;
        border: 1px solid var(--gold);
        border-radius: 2px;
        color: var(--gold-light);
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        font-size: 0.8rem;
        transition: background 150ms ease, color 150ms ease;
    }

    .book-cta:hover {
        background: var(--gold);
        color: var(--ink);
    }

    /* ── Services ─────────────────────────────────────── */
    .services {
        max-width: var(--pg-w-max, 1200px);
        margin: 0 auto;
        padding: 0 1.5rem var(--section-gap);
    }

    .services-head {
        text-align: center;
        max-width: 44ch;
        margin: 0 auto 2.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .eyebrow.dark {
        color: var(--gold);
    }

    .services-head h2 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(1.6rem, 3.5vw, 2.2rem);
        font-weight: 700;
        color: var(--ink);
        margin: 0;
        letter-spacing: -0.01em;
    }

    .services-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }

    .service-card {
        display: grid;
        gap: 0.6rem;
        background: #fff;
        border: 1px solid var(--rule);
        border-radius: 12px;
        padding: 1.75rem;
        text-decoration: none;
        color: inherit;
        transition:
            box-shadow 0.2s,
            transform 0.15s;
    }

    .service-card:hover {
        box-shadow: 0 4px 24px hsl(30, 20%, 15%, 0.08);
        transform: translateY(-2px);
    }

    .service-icon {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.05rem;
        color: var(--ink);
        background: hsl(42, 55%, 65%, 0.18);
    }

    .service-card h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.05rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
        color: var(--ink);
    }

    .service-card p {
        font-size: 0.9rem;
        line-height: 1.55;
        color: var(--ink-soft);
        margin: 0;
    }

    .service-link {
        font-family: "Montserrat", sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--gold);
    }

    @media (min-width: 640px) {
        .services-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 960px) {
        .services-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
