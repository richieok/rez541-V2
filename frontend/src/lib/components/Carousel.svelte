<script>
    import { browser } from "$app/environment";
    let { images = [], id } = $props();

    let currentIndex = $state(0);
    let beginning = $derived(currentIndex === 0);
    let end = $derived(currentIndex === images.length - 1);
    let scrollTimeout;

    function handleScroll(e) {
        const carousel = e.target;
        const cards = carousel.querySelectorAll(".card");
        if (cards.length === 0) return;

        // Clear previous timeout
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            // Set new timeout - fires when scrolling stops
            console.log("scroll");
            // Find the card closest to the current scroll position
            let minDistance = Infinity;
            cards.forEach((card, index) => {
                const distance = Math.abs(
                    card.offsetLeft - carousel.scrollLeft,
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    currentIndex = index;
                }
            });
        }, 150);
    }

    function clickScroll(e) {
        if (e.target.dataset.direction) {
            const carouselContainer = e.target.closest(".carousel-container");
            const carousel = carouselContainer.querySelector(".carousel");
            const cards = carousel.querySelectorAll(".card");

            if (cards.length == 0) {
                return;
            }

            // Find current card index
            let minDistance = Infinity;
            cards.forEach((card, index) => {
                const distance = Math.abs(
                    card.offsetLeft - carousel.scrollLeft,
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    currentIndex = index;
                }
            });

            // Calculate new index
            const newIndex =
                e.target.dataset.direction === "left"
                    ? Math.max(0, currentIndex - 1)
                    : Math.min(cards.length - 1, currentIndex + 1);

            currentIndex = newIndex;
            // console.log(newIndex);

            // Scroll to the new card
            carousel.scrollTo({
                left: cards[newIndex].offsetLeft,
                behavior: "smooth",
            });
        }
    }
</script>

<div class="carousel-container" onscroll={handleScroll}>
    <button
        onclick={clickScroll}
        data-direction="left"
        aria-label="Previous"
        disabled={currentIndex === 0}
    >
        &#10094;
    </button>
    <div class="carousel" onscroll={handleScroll}>
        {#each images as image (image)}
            <div class="card">
                <a href="/room/{id}">
                    <img src={image} alt="Carousel" />
                </a>
            </div>
        {/each}
    </div>
    <button
        onclick={clickScroll}
        data-direction="right"
        aria-label="Next"
        disabled={images.length < 1 || currentIndex === images.length - 1}
    >
        &#10095;
    </button>
</div>

<style>
    .carousel-container {
        position: relative;
        aspect-ratio: 1;

        > button {
            position: absolute;
            padding: 0.8rem;
            background-color: rgb(122, 102, 186);
            border-radius: 50%;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
        }

        > button:hover:not(:disabled) {
            background-color: rgb(102, 82, 166);
            transform: translateY(-50%) scale(1.2);
        }

        > button:active:not(:disabled) {
            transform: translateY(-50%) scale(0.95);
        }

        > button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        > button:first-of-type {
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
        }

        > button:last-of-type {
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .carousel {
        width: 100%;
        height: 100%;
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .card {
        flex: 0 0 100%;
        padding: 0 1rem 1rem;
        scroll-snap-align: center;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
</style>
