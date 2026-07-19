import { retrieveSignedUrls } from '$lib/server/signing.js';
import { getSpaImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

// Falls back to these defaults if the backend/database is unreachable, so
// the spa page still renders images.
const DEFAULT_SPA_IMAGES = {
    heroImage: "public/spa/scrub-room.jpg",
    lotusImage: "public/spa/spa-lotus-plain.svg",
    galleryImages: [
        "public/spa/living-room.jpg",
        "public/spa/scrub-room-shot.jpg",
        "public/spa/scrub-room2.jpg",
    ],
};

export async function load() {
    let { heroImage, lotusImage, galleryImages } = DEFAULT_SPA_IMAGES;
    try {
        ({ heroImage, lotusImage, galleryImages } = await getSpaImages());
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve spa images from backend, using defaults');
    }

    // Only the above-the-fold hero images are signed server-side so they can
    // start downloading with the first paint; the gallery resolves client-side
    // via <SignedImage>.
    const res = await retrieveSignedUrls([heroImage, lotusImage]);
    if (res.error) {
        logger.error({ statusText: res.statusText }, 'Failed to retrieve signed URLs');
        return { galleryImages };
    }
    const { signedUrls } = await res.json();
    return {
        signedUrls,
        heroImage,
        lotusImage,
        galleryImages
    };
}
