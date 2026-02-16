<footer>
    <div class="wrapper">
        <div class="f-column s-fit">
            <h3>Quick Links</h3>
            <div>
                <ul>
                    <li><a href="/#">Home</a></li>
                    <li><a href="/#">Accommodations</a></li>
                    <li><a href="/#">Spa & Wellness</a></li>
                    <li><a href="/#">Book Now</a></li>
                </ul>
            </div>
        </div>
        <div class="f-column s-basic">
            <h3>Contact Information</h3>
            <div>
                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    Plot 541 John Chukwu Cres, off Dahiru Mustapha Boulevard, Wuye,
                    Abuja 900001, Federal Capital Territory
                </p>
                <p><i class="fa-solid fa-phone"></i>+234 080 6740 1316</p>
            </div>
        </div>
        <div class="f-column s-basic">
            <h3>Hours</h3>
            <div>
                <p>
                    <b>Reception:</b> 24 Hours Check-in: 3:00 PM Check-out: [11:00
                    AM];
                </p>
                <p>
                    <b>Restaurant:</b> 7:00 AM - 10:00 PM
                </p>
                <p><b>Spa:</b> 9:00 AM - 8:00 PM</p>
                <p><b>Pool:</b> 6:00 AM - 9:00 PM</p>
            </div>
        </div>
        <div class="f-column s-fit">
            <h3>Follow Us</h3>
            <div class="flex">
                <a
                    href="https://www.twitter.com/residence541"
                    aria-label=""
                    target="_blank"
                    ><i class="fa-brands fa-twitter fa-lg"></i></a
                >
                <a
                    aria-label=""
                    target="_blank"
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
        container-type: inline-size;
        padding: 2rem 1rem;
    }
    .wrapper {
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        gap: 2rem;
        font-size: 1.1rem;
    }
    .f-column {
        flex: 0 1 auto;
    }
    .s-fit {
        width: fit-content;
    }
    h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 5px;
    }
    ul {
        list-style: none;
    }
    a {
        font-weight: bold;
    }
    a:any-link {
        text-decoration-line: none;
        color: inherit;
    }
    p > i {
        padding-right: 0.5rem;
    }
    .flex {
        display: flex;
        gap: 1rem;
    }
    .flex a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
    }
    .fit-con {
        width: fit-content;
    }
    .copy {
        text-align: center;
        margin-top: 2rem;
        font-size: 1rem;
    }

    @container (width > 640px) {
        .wrapper {
            flex-direction: row;
            flex-wrap: wrap;
        }
        .s-basic {
            /* width: clamp(200px, 40vw, 600px) */
            min-width: 200px;
            max-width: 400px;
        }
    }
</style>
