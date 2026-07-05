<footer>
    <span class="watermark" aria-hidden="true">541</span>

    <div class="footer-top">
        <p class="brand-name">Residence 541</p>
        <p class="brand-tag">A quiet address in the capital.</p>
    </div>

    <div class="footer-grid">
        <nav class="f-column" aria-label="Footer">
            <h3>Explore</h3>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/rooms">Accommodations</a></li>
                <li><a href="/spa">Spa &amp; Wellness</a></li>
                <li><a class="accent" href="/rooms">Book Now</a></li>
            </ul>
        </nav>

        <div class="f-column">
            <h3>Contact</h3>
            <p>
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                Plot 541 John Chukwu Cres, off Dahiru Mustapha Boulevard, Wuye,
                Abuja 900001, Federal Capital Territory
            </p>
            <p>
                <a href="tel:+2348067401316">
                    <i class="fa-solid fa-phone" aria-hidden="true"></i>
                    +234 080 6740 1316
                </a>
            </p>
        </div>

        <div class="f-column">
            <h3>Hours</h3>
            <p><span>Reception</span> 24 hours</p>
            <p><span>Check-in / out</span> 3:00 PM&ndash;11:00 AM</p>
            <p><span>Restaurant</span> 7:00 AM&ndash;10:00 PM</p>
            <p><span>Spa</span> 9:00 AM&ndash;8:00 PM</p>
            <p><span>Pool</span> 6:00 AM&ndash;9:00 PM</p>
        </div>

        <div class="f-column">
            <h3>Follow</h3>
            <div class="socials">
                <a
                    href="https://www.twitter.com/residence541"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener"><i class="fa-brands fa-twitter"></i></a
                >
                <a
                    aria-label="WhatsApp"
                    target="_blank"
                    rel="noopener"
                    href="https://wa.me/2348067401316"
                    ><i class="fa-brands fa-whatsapp"></i></a
                >
            </div>
        </div>
    </div>

    <p class="copy">&copy; 2026 Residence 541. All rights reserved.</p>
</footer>

<style>
    footer {
        position: relative;
        container-type: inline-size;
        overflow: hidden;
        background: var(--clr-ink);
        color: hsl(40, 20%, 88%);
        padding: 3rem 1.5rem 2rem;
    }

    .watermark {
        position: absolute;
        top: -0.3em;
        right: -0.05em;
        font-family: var(--font-display);
        font-size: 12rem;
        font-weight: 600;
        line-height: 1;
        color: hsl(40, 20%, 88%);
        opacity: 0.05;
        pointer-events: none;
        user-select: none;
    }

    .footer-top {
        max-width: var(--pg-w-max);
        margin: 0 auto 2.5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid hsl(40, 15%, 88%, 0.14);
    }

    .brand-name {
        font-family: var(--font-display);
        font-size: clamp(1.6rem, 3vw, 2.1rem);
        font-weight: 600;
        color: white;
        margin: 0 0 0.35rem;
    }

    .brand-tag {
        font-size: 0.95rem;
        color: hsl(40, 15%, 70%);
        margin: 0;
    }

    .footer-grid {
        position: relative;
        max-width: var(--pg-w-max);
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .f-column h3 {
        font-family: "Montserrat", sans-serif;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--clr-gold);
        margin: 0 0 1rem;
    }

    .f-column ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    .f-column p {
        margin: 0 0 0.6rem;
        font-size: 0.9rem;
        line-height: 1.6;
        color: hsl(40, 15%, 78%);
    }

    .f-column p > span {
        display: inline-block;
        min-width: 8.5em;
        color: hsl(40, 15%, 60%);
    }

    .f-column p i {
        width: 1.2em;
        color: var(--clr-gold);
    }

    .f-column a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s;
    }

    .f-column a:hover {
        color: var(--clr-gold);
    }

    .f-column a.accent {
        color: var(--clr-gold);
        font-weight: 600;
    }

    .socials {
        display: flex;
        gap: 1rem;
    }

    .socials a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        border: 1px solid hsl(40, 15%, 88%, 0.2);
        font-size: 1.1rem;
    }

    .socials a:hover {
        border-color: var(--clr-gold);
    }

    .copy {
        position: relative;
        max-width: var(--pg-w-max);
        margin: 2.5rem auto 0;
        padding-top: 1.5rem;
        border-top: 1px solid hsl(40, 15%, 88%, 0.14);
        text-align: center;
        font-size: 0.8rem;
        color: hsl(40, 15%, 60%);
    }

    @container (width > 700px) {
        .footer-grid {
            grid-template-columns: 1.2fr 1.4fr 1.4fr 1fr;
        }
        .footer-grid > .f-column:not(:first-child) {
            padding-left: 2rem;
            border-left: 1px solid hsl(40, 15%, 88%, 0.14);
        }
    }
</style>
