import { getServiceMenuImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

async function fetchMenu(fetch) {
    try {
        const res = await fetch('http://backend:4000/api/rez541/v1.1/spa/menu');
        if (!res.ok) {
            logger.error({ status: res.status }, 'Failed to fetch spa menu');
            return null;
        }
        const { spaMenu } = await res.json();
        return spaMenu;
    } catch (error) {
        logger.error({ err: error }, 'Failed to fetch spa menu');
        return null;
    }
}

async function fetchImages() {
    // Hero/lotus keys and their signed URLs come from a single backend call.
    // On failure we degrade to no images rather than a hardcoded fallback
    // photo the backend may no longer even serve.
    try {
        return await getServiceMenuImages();
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve service menu images from backend');
        return { signedUrls: {} };
    }
}

export async function load({ fetch }) {
    // Menu and images are independent, so fetch them concurrently instead
    // of one after another.
    const [menu, images] = await Promise.all([fetchMenu(fetch), fetchImages()]);

    return {
        signedUrls: images.signedUrls,
        heroImage: images.heroImage,
        lotusImage: images.lotusImage,
        menu
    };
}
