<script>
    import Hero from "./Hero.svelte";
    import FeatAmenities from "./FeatAmenities.svelte";
    import LocationInfo from "$lib/components/LocationInfo.svelte";
    let { data } = $props();
    let { signedUrls, amenitiesDataArray } = data;
    // console.log(data.signedUrls)
</script>

<svelte:head><title>Home</title></svelte:head>
<div class="fade-in">
    <Hero src={signedUrls["public/spa/reception3.jpg"]} />

    <div class="section">
        <div class="x-layout">
            <div class="img-frame pos-1">
                <img
                    src={signedUrls["public/3-bed-suite/living-room-3-bed.jpg"]}
                    alt=""
                />
            </div>
            <div class="img-frame pos-3">
                <img
                    src={signedUrls["public/exterior/block1-view-800w.jpg"]}
                    alt=""
                />
            </div>
            <div>
                <p class="message">
                    At Residence 541, we believe our guests deserve more than
                    just a place to stay, they deserve a great experience. From
                    therapeutic spa treatments to personalized services, we've
                    created a space where memories are made and spirits are
                    renewed.
                </p>
            </div>
        </div>
    </div>
    <div class="max-w">
        <FeatAmenities cardDataArray={amenitiesDataArray} />
    </div>
    <div class="max-w">
        <LocationInfo/>
    </div>
</div>

<style>
    .section {
        height: max(calc(100vh - var(--header-height)), 500px);
        /* max-width: var(--pg-w-max); */
        container-type: inline-size;
        padding: 0.5rem 1rem;
        margin: 0 auto;
    }

    .img-frame {
        width: 100%;
        height: 100%;
        overflow: hidden;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
        }
    }

    .x-layout {
        display: grid;
        height: 100%;
        /* max-width: var(--pg-w-max); */
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: auto 1fr;
        overflow: hidden;
        margin: 0 auto;
        /* gap: 1rem; */
        /* > div {
            padding: 0 1rem;
        } */
    }

    .pos-1 {
        display: none;
    }

    .pos-3 {
        grid-column: 1 / span 2;
        grid-row: 2 / span 1;
        > img {
            object-position: bottom center;
        }
    }

    div:has(> .message) {
        display: grid;
        grid-column: 1 / span 2;
        place-content: center;
        /* padding: 2rem 1rem; */
    }

    .message {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.4;
        text-align: center;
        padding: 0.5rem 1rem;
        /* margin: .5rem 1rem .5rem .5rem;
        box-shadow: 2px 2px 5px oklab(86.68599999999999% 0 -0.0001);
        border-radius: 10px; */
    }

    @container (width > 700px) {
        .pos-1 {
            display: block;
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
            padding-left: 0;
            padding-right: 0.5rem;
        }

        .pos-3 {
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
            padding-right: 0;
            padding-left: 0.5rem;
        }
        div:has(> .message) {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
        }
    }
    @container ( width > 1199px) {
        .section {
            padding: 0.5rem 0;
        }
    }
</style>
