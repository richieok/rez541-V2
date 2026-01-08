<script>
    import Hero from "./Hero.svelte";
    let {data} = $props()
    let {signedUrls} = data
    // console.log(data.signedUrls)
</script>

<svelte:head><title>Home</title></svelte:head>
<div class="fade-in">
    <Hero src="{signedUrls["public/spa/reception3.jpg"]}"/>

    <div class="section">
        <div class="x-layout">
            <div class="img-frame pos-1">
                <img
                    src="{signedUrls["public/3-bed-suite/living-room-3-bed.jpg"]}"
                    alt=""
                />
            </div>
            <div class="img-frame pos-3">
                <img
                    src="{signedUrls["public/exterior/block1-view-800w.jpg"]}"
                    alt=""
                />
            </div>
            <div>
                <p class="message">
                    At Residence 541, we believe our guests deserve more than just a
                    place to stay, they deserve a great experience. From therapeutic
                    spa treatments to personalized services, we've created a space
                    where memories are made and spirits are renewed.
                </p>
            </div>
        </div>
    </div>
</div>


<style>
    .section {
        height: max(calc(100vh - var(--header-height)), 500px);
        container-type: inline-size;
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
        max-width: var(--pg-w-max);
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: auto 1fr;
        overflow: hidden;
        padding: .5rem 0 .5rem;
        margin: 0 auto;
        > div {
            padding: 0 1rem;
        }
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
        padding: 2rem 1rem;
    }

    .message {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.4;
        text-align: center;
        /* padding: 0 1rem; */
    }

    @container (width > 700px) {
        .pos-1 {
            display: block;
            grid-column: 1 / span 1;
            grid-row: 1 / span 2;
        }

        .pos-3 {
            grid-column: 2 / span 1;
            grid-row: 2 / span 1;
        }
        div:has(> .message) {
            grid-column: 2 / span 1;
            grid-row: 1 / span 1;
        }
    }
    @container ( width > 1200px){
        .x-layout {
            & .pos-1 {
                padding-left: 0;
                padding-right: .5rem;
            }
            & .pos-3 {
                padding-right: 0;
                padding-left: .5rem;
            }
        }
    }
</style>