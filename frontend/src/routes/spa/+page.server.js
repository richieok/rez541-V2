import { getSpaImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

export async function load() {
    // Hero/lotus keys and their signed URLs come from a single backend call;
    // the gallery keys resolve client-side via <SignedImage>. On failure we
    // degrade to no images rather than a hardcoded fallback photo the
    // backend may no longer even serve.
    let { heroImage, lotusImage, galleryImages, signedUrls } = { galleryImages: [], signedUrls: {} };
    try {
        ({ heroImage, lotusImage, galleryImages, signedUrls } = await getSpaImages());
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve spa images from backend');
    }

    return {
        signedUrls,
        heroImage,
        lotusImage,
        galleryImages
    };
}
