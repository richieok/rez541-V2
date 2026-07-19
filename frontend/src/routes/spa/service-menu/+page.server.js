import { retrieveSignedUrls } from '$lib/server/signing.js';
import { getServiceMenuImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

// Falls back to these defaults if the backend/database is unreachable, so
// the service menu page still renders images.
const DEFAULT_SERVICE_MENU_IMAGES = {
    heroImage: "public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png",
    lotusImage: "public/spa/spa-lotus-plain.svg",
};

export async function load({ fetch }) {
    let menu = null;
    try {
        const menuRes = await fetch('http://backend:4000/api/rez541/v1.1/spa/menu');
        if (menuRes.ok) {
            ({ spaMenu: menu } = await menuRes.json());
        } else {
            logger.error({ status: menuRes.status }, 'Failed to fetch spa menu');
        }
    } catch (error) {
        logger.error({ err: error }, 'Failed to fetch spa menu');
    }

    let { heroImage, lotusImage } = DEFAULT_SERVICE_MENU_IMAGES;
    try {
        ({ heroImage, lotusImage } = await getServiceMenuImages());
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve service menu images from backend, using defaults');
    }

    let signedUrls = {};
    const res = await retrieveSignedUrls([heroImage, lotusImage]);
    if (res.error) {
        logger.error({ statusText: res.statusText }, 'Failed to retrieve signed URLs');
    } else {
        ({ signedUrls } = await res.json());
    }

    return { signedUrls, heroImage, lotusImage, menu };
}
