<script>
    import { browser } from "$app/environment";
    import {
        getCachedSignedUrls,
        resolveSignedUrls,
    } from "$lib/utils/signedUrlCache.js";

    // Renders an image from the private S3 bucket given its object key:
    //   <SignedImage src="public/3-bed-suite/living-room-3-bed.jpg" alt="..." />
    // A still-valid signed URL cached in localStorage is used directly;
    // otherwise a fresh one is fetched from /app/signurls (deduplicated with
    // any other components requesting the same key) and cached.
    let { src, alt = "", loading = "lazy", ...rest } = $props();

    // Synchronous cache lookup so a cached image renders on the first client
    // pass instead of flashing the skeleton for a frame.
    function cachedUrlFor(key) {
        if (!browser) return null;
        const { cached } = getCachedSignedUrls([key]);
        return cached[key] ?? null;
    }

    let signedSrc = $state(cachedUrlFor(src));
    let failed = $state(false);

    $effect(() => {
        const key = src;
        const hit = cachedUrlFor(key);
        if (hit) {
            signedSrc = hit;
            failed = false;
            return;
        }
        let stale = false;
        signedSrc = null;
        failed = false;
        resolveSignedUrls([key]).then((urls) => {
            if (stale) return;
            if (urls[key]) {
                signedSrc = urls[key];
            } else {
                failed = true;
            }
        });
        return () => {
            stale = true;
        };
    });
</script>

{#if signedSrc}
    <img src={signedSrc} {alt} {loading} {...rest} />
{:else if failed}
    <div class="img-fallback" role="img" aria-label={alt}></div>
{:else}
    <div class="img-skeleton" aria-hidden="true"></div>
{/if}

<style>
    img {
        display: block;
        width: 100%;
    }

    /* Placeholders assume the site's usual 4/3 media slot; size them from
       the parent with :global() if a slot needs something else. */
    .img-skeleton,
    .img-fallback {
        width: 100%;
        aspect-ratio: 4 / 3;
    }

    .img-fallback {
        background: hsl(40, 20%, 90%);
    }

    .img-skeleton {
        background: linear-gradient(
            90deg,
            hsl(40, 20%, 92%) 25%,
            hsl(40, 25%, 96%) 50%,
            hsl(40, 20%, 92%) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s ease-in-out infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
