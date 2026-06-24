<script>
    let { data } = $props();
    let { signedUrls } = data;
</script>

<div class="page-wrapper fade-in">
    <div class="s-hero">
        <div class="bg-img">
            <img
                src={signedUrls["public/spa/spa-lotus-plain.svg"]}
                alt="back ground images of shell leaves"
            />
        </div>
        <p class="text">
            Discover our comprehensive spa menu featuring therapeutic massages,
            rejuvenating facials, luxurious body treatments, and specialized
            wellness services. Our professional therapists use premium products
            and proven techniques to deliver exceptional results in a tranquil,
            sophisticated setting. Book your treatment today and experience the
            perfect blend of relaxation and rejuvenation.
        </p>
    </div>
    <div class="features">
        <section class="headline">
            <h2>Our Spa Features:</h2>
            <p>
                Our spa facilities have been designed with your comfort and
                privacy in mind. Each element of our wellness center contributes
                to creating an atmosphere of complete relaxation and
                rejuvenation.
            </p>
        </section>
        <section>
            <h2>What We Offer:</h2>
            <div class="offers">
                <div>
                    <b>Treatment Rooms</b> Experience your services in our beautifully
                    appointed treatment rooms, each designed to provide a private,
                    peaceful environment. Soft lighting, comfortable treatment beds,
                    and calming décor ensure you feel completely at ease from the
                    moment you arrive.
                </div>
                <div>
                    <h3>Relaxation Lounge</h3>
                    <p>
                        Before or after your treatment, unwind in our serene
                        relaxation area. Enjoy complimentary herbal teas and
                        infused water while you allow your body and mind to
                        fully embrace the benefits of your spa experience.
                    </p>
                </div>
                <div>
                    <b>Changing Facilities</b> Our well-appointed changing rooms
                    feature private lockers, shower facilities, and all the amenities
                    you need to prepare for your treatment or freshen up afterwards.
                </div>
                <div>
                    <b>Sauna & Steam Room</b> Enhance your spa visit with time in
                    our traditional sauna or aromatic steam room, perfect for detoxifying
                    and preparing your body for treatments.
                </div>
                <div>
                    <b>Couples' Treatment Suite</b> Share the spa experience with
                    someone special in our dedicated couples' treatment room, where
                    you can enjoy side-by-side services in an intimate, romantic
                    setting.
                </div>
            </div>
        </section>
        <!-- <img src={signedUrls["public/spa/spa-lotus-plain.svg"]} alt=""> -->
    </div>
    <!-- <div>
        <section>
            <h2>Curated Treatments for Complete Wellness</h2>
            <p>
                Explore our extensive menu of spa services, each designed to
                address your specific wellness goals. From tension-relieving
                massages to skin-transforming facials, our expert therapists
                customize every treatment to your individual needs.
            </p>
        </section>
        <section>
            <h3>MASSAGE THERAPY</h3>
            <h4>Swedish Massage 60 minutes | 90 minutes</h4>
            <p>
                The classic relaxation massage using long, flowing strokes to
                ease tension, improve circulation, and promote overall
                relaxation. Perfect for first-time spa guests or those seeking
                gentle, full-body relaxation.
            </p>
            <h4>Deep Tissue Massage 60 minutes | 90 minutes</h4>
            <p>
                Targeted therapy focusing on deeper layers of muscle and
                connective tissue. Ideal for chronic tension, sports recovery,
                or specific problem areas. Your therapist applies firm pressure
                to release stubborn knots and restore mobility.
            </p>
            <h4>Couples Massage 60 minutes | 90 minutes</h4>
            <p>
                Share the spa experience with someone special. Enjoy
                side-by-side massages in our private couples' suite, perfect for
                anniversaries, special occasions, or simply quality time
                together.
            </p>
        </section>
        <section>
            <h3>FACIAL TREATMENTS</h3>
            <h4>Classic European Facial 60 minutes</h4>
            <p>
                A rejuvenating facial that cleanses, exfoliates, and nourishes
                the skin. Customized to your skin type, this treatment includes
                a relaxing massage and a hydrating mask to leave your complexion
                glowing.
            </p>
            <h4>Anti-Aging Facial 75 minutes</h4>
            <p>
                Target fine lines, wrinkles, and loss of firmness with our
                advanced anti-aging facial. Using potent serums and lifting
                techniques, this treatment helps restore youthful vitality to
                your skin.
            </p>
            <h4>Acne Treatment Facial 60 minutes</h4>
            <p>
                Designed for acne-prone skin, this facial includes deep
                cleansing, extractions, and calming masks to reduce inflammation
                and prevent future breakouts. Your therapist will also provide
                personalized skincare advice.
            </p>
        </section>
        <section>
            <h3>BODY TREATMENTS</h3>
            <h4>Body Scrub 45 minutes</h4>
            <p>
                Reveal silky-smooth skin with this all-over exfoliation
                treatment. Choose from sea salt, sugar, or coffee scrubs
                enriched with nourishing oils. Removes dead skin cells, improves
                circulation, and leaves skin soft and glowing.
            </p>
            <h4>Body Wrap 60 minutes</h4>
            <p>
                Detoxify and nourish your skin with this therapeutic wrap
                treatment. Your body is enveloped in mineral-rich mud, seaweed,
                or aromatic ingredients, then wrapped for deep absorption.
                Includes a relaxing scalp or foot massage while you cocoon.
            </p>
            <h4>Back Facial 45 minutes</h4>
            <p>
                Give your back the same attention as your face. This treatment
                includes deep cleansing, exfoliation, extractions, massage, and
                a purifying mask—perfect for hard-to-reach areas prone to
                congestion.
            </p>
            <h4>Body Butter Treatment 30 minutes</h4>
            <p>
                Intensive hydration for dry skin. Your entire body is massaged
                with luxurious body butter, leaving skin deeply moisturized,
                soft, and delicately scented.
            </p>
        </section>
    </div> -->
</div>

<style>
    .page-wrapper {
        --pg-height: clamp(500px, calc(100vh - var(--header-height)), 800px);
        min-height: var(--pg-height);
        --gap: 1rem;
        --padding-h: 1rem;
        padding: var(--gap) 1rem;
    }

    .s-hero {
        display: grid;
        grid-template-columns:
            1fr minmax(80%, calc(900px - (var(--padding-h) * 2)))
            1fr;
        grid-template-rows: 1fr auto 1fr;
        min-height: var(--pg-height);
        align-content: center;
        font-family: "Montserrat", sans-serif;
        overflow: hidden;
        > .text {
            text-align: center;
            font-size: clamp(1.5rem, 4vw, 1.8rem);
            font-weight: 500;
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            padding-left: var(--padding-h);
            padding-right: var(--padding-h);
        }
        > .bg-img {
            grid-column: 1 / span 3;
            grid-row: 1 / span 3;
            > img {
                height: var(--pg-height);
                width: 100%;
                opacity: 0.3;
                object-fit: cover;
            }
        }
    }
    .features {
        > section {
            padding: 1rem 0;
        }
        h2 {
            font-size: 2.5em;
        }
        > .headline {
            display: grid;
            justify-content: center;
            > * {
                max-width: 400px;
                text-align: center;
            }
            p {
                font-size: 1.2em;
            }
        }
        section:has(.offers) > h2 {
            text-align: center;
        }
        .offers {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;

            > div {
                display: grid;
                grid-template-rows: subgrid;
                grid-row: span 2;
                gap: 0;
            }
        }
    }
</style>
