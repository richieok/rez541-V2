<script>
    import KeyTag from "./KeyTag.svelte";

    let copied = $state(false);
    let mapFrame;

    async function copyAddress() {
        const address = mapFrame?.dataset.address;
        if (!address) return;
        try {
            await navigator.clipboard.writeText(address);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch {
            // Clipboard unavailable - nothing more we can do here.
        }
    }
</script>

<div class="find-us">
    <div class="map-wrapper">
        <iframe
            bind:this={mapFrame}
            class="map"
            title="Google Maps location of Residence 541 Apartments and Suites"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2268366368726!2d7.437375674722995!3d9.04306158876931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b64e37ac631%3A0x993172250bc3a72f!2sResidence%20541%20Apartments%20and%20Suites!5e0!3m2!1sen!2sng!4v1767703931960!5m2!1sen!2sng"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            data-address="Plot 541 John Chukwu Cres, off Dahiru Mustapha Boulevard, Wuye, Abuja 900001, Federal Capital Territory"
        ></iframe>
    </div>
    <div class="info-panel">
        <KeyTag text="Find Us" />
        <h2>A quiet corner of Wuye.</h2>
        <p>
            We are located in Wuye, putting you within easy reach of Wuse and
            the Central District of Abuja, while providing a peaceful retreat
            from the bustle of city life.
        </p>
        <button class="copy-btn" onclick={copyAddress}>
            <i class="fa-regular fa-copy"></i>
            {copied ? "Address copied" : "Copy address"}
        </button>
    </div>
</div>

<style>
    .find-us {
        display: grid;
        gap: 2.5rem;
    }

    .map-wrapper {
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 20px 40px hsl(30, 20%, 15%, 0.14);
    }

    .map {
        width: 100%;
        height: 320px;
        display: block;
    }

    .info-panel {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.1rem;
    }

    h2 {
        font-family: var(--font-display);
        font-size: clamp(1.6rem, 3vw, 2.1rem);
        font-weight: 600;
        color: var(--clr-ink);
        margin: 0;
    }

    p {
        font-size: 1.05rem;
        color: hsl(30, 12%, 38%);
        line-height: 1.6;
        margin: 0;
        max-width: 44ch;
    }

    .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-family: "Montserrat", sans-serif;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--clr-ink);
        background: transparent;
        border: 1px solid var(--clr-hairline);
        border-radius: 8px;
        padding: 0.7rem 1.1rem;
        cursor: pointer;
        transition: border-color 0.2s, color 0.2s;
    }

    .copy-btn:hover {
        border-color: var(--clr-gold);
        color: var(--clr-brass);
    }

    @container (width > 800px) {
        .find-us {
            grid-template-columns: 1.1fr 1fr;
            align-items: center;
        }
        .map {
            height: 100%;
            min-height: 320px;
        }
    }
</style>
