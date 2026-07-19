<script>
    import { onMount } from 'svelte';

    let { data } = $props();
    let { signedUrls, heroImage, lotusImage, menu } = data;

    const heroImg = signedUrls?.[heroImage];
    const lotusImg = signedUrls?.[lotusImage];

    // Menu content comes from GET /api/rez541/v1.1/spa/menu (single source
    // of truth in backend/spa/services.js), fetched in +page.server.js.
    const treatments = menu?.treatments ?? [];
    const facials = menu?.facials ?? [];
    const waxing = menu?.waxing ?? [];
    const nailCare = menu?.nailCare ?? [];
    const packages = menu?.packages ?? [];
    const hammam = menu?.hammam ?? [];
    const wellness = menu?.wellness ?? [];

    function fmt(n) {
        return '₦' + n.toLocaleString();
    }

    let activeSection = $state('treatments');

    const navItems = [
        { id: 'treatments', label: 'Treatments' },
        { id: 'facials', label: 'Facials' },
        { id: 'waxing', label: 'Waxing' },
        { id: 'nails', label: 'Nail Care' },
        { id: 'packages', label: 'Packages' },
        { id: 'hammam', label: 'Hammam' },
        { id: 'wellness', label: 'Wellness' },
    ];

    function scrollTo(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const navH = document.querySelector('.category-nav')?.offsetHeight ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 24;
        window.scrollTo({ top, behavior: 'smooth' });
        activeSection = id;
    }

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) activeSection = entry.target.id;
                }
            },
            { rootMargin: '-30% 0px -60% 0px' }
        );
        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    });
</script>

<svelte:head>
    <title>Spa Service Menu - Residence 541</title>
</svelte:head>

<div class="page-wrapper fade-in">

    <!-- Hero -->
    <section class="s-hero">
        {#if heroImg}
            <div class="bg-img">
                <img src={heroImg} alt="541 Spa ambiance" />
            </div>
        {/if}
        <div class="overlay"></div>
        <div class="hero-content">
            {#if lotusImg}
                <img class="lotus" src={lotusImg} alt="" aria-hidden="true" />
            {/if}
            <p class="eyebrow">Experience · Restore · Renew</p>
            <h1>The Spa <em>@ 541</em></h1>
            <p class="tagline">A sanctuary of rest, ritual &amp; renewal</p>
        </div>
    </section>

    <!-- Sticky category nav -->
    <nav class="category-nav">
        <div class="nav-inner">
            {#each navItems as { id, label }}
                <button
                    class:active={activeSection === id}
                    onclick={() => scrollTo(id)}
                >{label}</button>
            {/each}
        </div>
    </nav>

    <!-- VAT notice -->
    <p class="vat-notice">All prices are exclusive of 7.5% VAT</p>

    <!-- Service sections -->
    {#if !menu}
        <p class="menu-error">Our service menu is temporarily unavailable. Please try again shortly.</p>
    {:else}
    <div class="menu">

        <!-- Treatments -->
        <section id="treatments" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Treatments</h2>
                    <p class="section-sub">Massage therapies for deep rest and recovery</p>
                </div>
            </div>
            <div class="service-list has-duration">
                <div class="list-head">
                    <span>Service</span>
                    <span>Duration</span>
                    <span>Price</span>
                </div>
                {#each treatments as item}
                    <div class="service-row">
                        <span class="s-name">{item.name}</span>
                        <span class="s-duration">{item.duration}</span>
                        <span class="s-price">{fmt(item.price)}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Facials -->
        <section id="facials" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Spa Facials</h2>
                    <p class="section-sub">Targeted skin treatments for a radiant complexion</p>
                </div>
            </div>
            <div class="service-list has-duration">
                <div class="list-head">
                    <span>Service</span>
                    <span>Duration</span>
                    <span>Price</span>
                </div>
                {#each facials as item}
                    <div class="service-row">
                        <span class="s-name">{item.name}</span>
                        <span class="s-duration">{item.duration}</span>
                        <span class="s-price">{fmt(item.price)}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Waxing -->
        <section id="waxing" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Waxing Services</h2>
                    <p class="section-sub">Professional hair removal with lasting results</p>
                </div>
            </div>
            <div class="service-list two-col">
                {#each waxing as item}
                    <div class="service-row">
                        <span class="s-name">{item.name}</span>
                        <span class="s-price">{fmt(item.price)}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Nail Care -->
        <section id="nails" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Nail Care</h2>
                    <p class="section-sub">Manicures, pedicures and finishing treatments</p>
                </div>
            </div>
            <div class="service-list two-col">
                {#each nailCare as item}
                    <div class="service-row">
                        <span class="s-name">{item.name}</span>
                        <span class="s-price">{fmt(item.price)}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Packages -->
        <section id="packages" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Packages</h2>
                    <p class="section-sub">Curated rituals for total restoration</p>
                </div>
            </div>
            <div class="packages-grid">
                {#each packages as pkg}
                    <div class="pkg-card" class:featured={pkg.featured}>
                        <div class="pkg-top">
                            <div>
                                <h3>{pkg.name}</h3>
                                {#if pkg.duration}
                                    <span class="pkg-duration">{pkg.duration}</span>
                                {/if}
                            </div>
                            {#if pkg.featured}
                                <span class="pkg-badge">Signature</span>
                            {/if}
                        </div>
                        <p class="pkg-desc">{pkg.description}</p>
                        <div class="pkg-price">
                            {#if pkg.price.couple}
                                <div class="price-pair">
                                    <div>
                                        <span class="price-label">Single</span>
                                        <span class="price-val">{fmt(pkg.price.single)}</span>
                                    </div>
                                    <div class="price-divider"></div>
                                    <div>
                                        <span class="price-label">Couple</span>
                                        <span class="price-val">{fmt(pkg.price.couple)}</span>
                                    </div>
                                </div>
                            {:else}
                                <span class="price-val solo">{fmt(pkg.price.single)}</span>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Hammam -->
        <section id="hammam" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Moroccan Hammam</h2>
                    <p class="section-sub">Ancient cleansing rituals reimagined</p>
                </div>
            </div>
            <div class="service-list two-col">
                {#each hammam as item}
                    <div class="service-row">
                        <span class="s-name">{item.name}</span>
                        <span class="s-price">{fmt(item.price)}</span>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Health & Wellness -->
        <section id="wellness" class="menu-section">
            <div class="section-header">
                <div>
                    <h2>Health &amp; Wellness</h2>
                    <p class="section-sub">Holistic programmes for mind, body and vitality</p>
                </div>
            </div>
            <div class="wellness-grid">
                {#each wellness as item}
                    <div class="wellness-card">
                        <div class="wellness-top">
                            <h3>{item.name}</h3>
                            <span class="pkg-badge">By booking only</span>
                        </div>
                        <p class="pkg-desc">{item.description}</p>
                    </div>
                {/each}
            </div>
            <p class="wellness-note">Wellness services pricing available on package and booking requirements.</p>
        </section>

    </div>
    {/if}
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
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .lotus {
        width: clamp(40px, 7vw, 70px);
        opacity: 0.85;
        filter: invert(1) sepia(1) saturate(0.5) hue-rotate(5deg) brightness(1.3);
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

    /* ── Category nav ─────────────────────────────────── */
    .category-nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--ink);
        border-bottom: 1px solid hsl(30, 15%, 22%);
    }

    .nav-inner {
        display: flex;
        gap: 0;
        overflow-x: auto;
        scrollbar-width: none;
        max-width: var(--pg-w-max, 1200px);
        margin: 0 auto;
        padding: 0 1rem;
    }

    .nav-inner::-webkit-scrollbar { display: none; }

    .category-nav button {
        background: none;
        border: none;
        color: hsl(40, 15%, 55%);
        font-family: "Montserrat", sans-serif;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 1rem 1.25rem;
        cursor: pointer;
        white-space: nowrap;
        border-bottom: 2px solid transparent;
        transition: color 0.2s, border-color 0.2s;
        flex-shrink: 0;
    }

    .category-nav button:hover {
        color: var(--gold-light);
    }

    .category-nav button.active {
        color: var(--gold);
        border-bottom-color: var(--gold);
    }

    /* ── VAT notice ───────────────────────────────────── */
    .vat-notice {
        text-align: center;
        font-family: "Montserrat", sans-serif;
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-soft);
        background: hsl(42, 40%, 92%);
        border-bottom: 1px solid var(--rule);
        padding: 0.55rem 1rem;
        margin: 0;
    }

    .menu-error {
        text-align: center;
        font-family: "Montserrat", sans-serif;
        color: var(--ink-soft);
        padding: var(--section-gap) 1.5rem;
        margin: 0;
    }

    /* ── Menu wrapper ─────────────────────────────────── */
    .menu {
        padding: 0 1.5rem var(--section-gap);
        max-width: 900px;
        margin: 0 auto;
    }

    /* ── Section ──────────────────────────────────────── */
    .menu-section {
        padding-top: var(--section-gap);
        scroll-margin-top: 80px;
    }

    .section-header {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        margin-bottom: 2rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid var(--rule);
    }

.section-header h2 {
        font-family: "Montserrat", sans-serif;
        font-size: clamp(1.5rem, 4vw, 2rem);
        font-weight: 700;
        color: var(--ink);
        margin: 0 0 0.15rem;
        letter-spacing: -0.02em;
    }

    .section-sub {
        font-size: 0.88rem;
        color: var(--ink-soft);
        margin: 0;
    }

    /* ── Service list ─────────────────────────────────── */
    .service-list {
        display: flex;
        flex-direction: column;
    }

    .list-head {
        display: grid;
        padding: 0.4rem 0 0.75rem;
        font-family: "Montserrat", sans-serif;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-soft);
        border-bottom: 1px solid var(--rule);
        margin-bottom: 0.25rem;
    }

    .has-duration .list-head,
    .has-duration .service-row {
        grid-template-columns: 1fr 120px 110px;
    }

    .list-head span:not(:first-child),
    .service-row .s-duration,
    .service-row .s-price {
        text-align: right;
    }

    .service-row {
        display: grid;
        align-items: center;
        padding: 0.85rem 0;
        border-bottom: 1px solid var(--rule);
        transition: background 0.15s;
    }

    .service-row:hover {
        background: hsl(42, 30%, 94%);
        margin: 0 -0.75rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        border-radius: 6px;
        border-bottom-color: transparent;
    }

    .s-name {
        font-size: 0.95rem;
        color: var(--ink);
    }

    .s-duration {
        font-size: 0.82rem;
        color: var(--ink-soft);
    }

    .s-price {
        font-family: "Montserrat", sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--gold);
    }

    /* Two-col list (no duration) */
    .two-col .service-row {
        grid-template-columns: 1fr 110px;
    }

    .two-col .s-price {
        text-align: right;
    }

    /* ── Packages ─────────────────────────────────────── */
    .packages-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }

    .pkg-card {
        background: #fff;
        border: 1px solid var(--rule);
        border-radius: 12px;
        padding: 1.5rem 1.75rem;
        display: grid;
        gap: 0.85rem;
        transition: box-shadow 0.2s;
    }

    .pkg-card:hover {
        box-shadow: 0 4px 24px hsl(30, 20%, 15%, 0.08);
    }

    .pkg-card.featured {
        background: var(--ink);
        border-color: transparent;
        color: #fff;
    }

    .pkg-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    }

    .pkg-card h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 0.25rem;
        letter-spacing: -0.01em;
    }

    .pkg-duration {
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--gold);
        font-family: "Montserrat", sans-serif;
    }

    .pkg-badge {
        font-family: "Montserrat", sans-serif;
        font-size: 0.6rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--ink);
        background: var(--gold);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .pkg-desc {
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--ink-soft);
        margin: 0;
    }

    .pkg-card.featured .pkg-desc {
        color: hsl(40, 20%, 65%);
    }

    .pkg-price {
        padding-top: 0.75rem;
        border-top: 1px solid var(--rule);
    }

    .pkg-card.featured .pkg-price {
        border-top-color: hsl(30, 15%, 25%);
    }

    .price-pair {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .price-divider {
        width: 1px;
        height: 2rem;
        background: var(--rule);
    }

    .pkg-card.featured .price-divider {
        background: hsl(30, 15%, 28%);
    }

    .price-label {
        display: block;
        font-family: "Montserrat", sans-serif;
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-soft);
        margin-bottom: 0.2rem;
    }

    .pkg-card.featured .price-label {
        color: hsl(40, 20%, 55%);
    }

    .price-val {
        font-family: "Montserrat", sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--gold);
    }

    .price-val.solo {
        display: block;
    }

    @media (min-width: 600px) {
        .packages-grid {
            grid-template-columns: 1fr 1fr;
        }

        .pkg-card.featured {
            grid-column: 1 / -1;
        }
    }

    /* ── Wellness ─────────────────────────────────────── */
    .wellness-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }

    .wellness-card {
        background: #fff;
        border: 1px solid var(--rule);
        border-radius: 12px;
        padding: 1.5rem 1.75rem;
        display: grid;
        gap: 0.75rem;
        transition: box-shadow 0.2s;
    }

    .wellness-card:hover {
        box-shadow: 0 4px 24px hsl(30, 20%, 15%, 0.08);
    }

    .wellness-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    }

    .wellness-card h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.01em;
        color: var(--ink);
    }

    .wellness-note {
        margin-top: 1.5rem;
        font-size: 0.82rem;
        font-style: italic;
        color: var(--ink-soft);
    }

    @media (min-width: 600px) {
        .wellness-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>
