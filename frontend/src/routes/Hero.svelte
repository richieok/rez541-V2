<script>
    import KeyTag from "$lib/components/KeyTag.svelte";
    let { src = "" } = $props();
</script>

<div class="hero">
    <div class="content">
        <div class="reveal r1"><KeyTag text="Plot 541 · Wuye, Abuja" /></div>
        <h1 class="reveal r2">
            <span class="kicker">Residence</span>
            <span class="numeral">541.</span>
        </h1>
        <p class="reveal r3">A quiet address in the capital.</p>
        <div class="actions reveal r4">
            <a class="cta" href="/rooms">Book Now</a>
            <a class="ghost-link" href="#about">Explore the residence ↓</a>
        </div>
    </div>
    <div class="photo">
        <img {src} alt="Residence 541 reception" />
    </div>
</div>

<style>
    .hero {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: min(46vh, 360px) auto;
        max-width: var(--pg-w-max);
        margin: 0 auto;
    }

    .photo {
        grid-row: 1;
        overflow: hidden;
        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 30%;
        }
    }

    .content {
        grid-row: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.9rem;
        padding: 2.25rem 1.5rem 2.75rem;
        font-family: "Open Sans", sans-serif;
    }

    h1 {
        margin: 0;
        display: flex;
        flex-direction: column;
        line-height: 0.95;
    }

    .kicker {
        font-family: "Montserrat", sans-serif;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: hsl(30, 12%, 40%);
    }

    .numeral {
        font-family: var(--font-display);
        font-optical-sizing: auto;
        font-size: clamp(4rem, 18vw, 6rem);
        font-weight: 600;
        color: var(--clr-ink);
        letter-spacing: -0.02em;
    }

    .content p {
        font-size: 1.15rem;
        color: hsl(30, 12%, 35%);
        margin: 0;
        max-width: 32ch;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem;
        margin-top: 0.5rem;
    }

    .cta {
        font-family: "Montserrat", sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--clr-ink);
        background: var(--clr-gold);
        border-radius: 8px;
        padding: 0.9rem 1.6rem;
        transition: background 0.2s, transform 0.15s;
    }

    .cta:hover {
        background: var(--clr-brass);
        color: white;
        transform: translateY(-1px);
    }

    .ghost-link {
        font-family: "Montserrat", sans-serif;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--clr-ink);
        text-decoration: none;
        opacity: 0.65;
        border-bottom: 1px solid transparent;
        transition: opacity 0.2s, border-color 0.2s;
    }

    .ghost-link:hover {
        opacity: 1;
        border-color: var(--clr-gold);
    }

    .reveal {
        opacity: 0;
        animation: rise 0.6s ease-out forwards;
    }
    .r1 {
        animation-delay: 0.05s;
    }
    .r2 {
        animation-delay: 0.15s;
    }
    .r3 {
        animation-delay: 0.3s;
    }
    .r4 {
        animation-delay: 0.45s;
    }

    @keyframes rise {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .reveal {
            animation: none;
            opacity: 1;
        }
    }

    @container (width > 700px) {
        .hero {
            grid-template-columns: minmax(320px, 42%) 1fr;
            grid-template-rows: min(85vh, 720px);
        }
        .photo {
            grid-row: 1;
            grid-column: 2;
        }
        .content {
            grid-row: 1;
            grid-column: 1;
            justify-content: center;
            padding: 2rem 2rem;
        }
    }
</style>
