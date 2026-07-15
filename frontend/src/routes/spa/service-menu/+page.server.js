import { retrieveSignedUrls } from '$lib/server/signing.js';
import logger from '$lib/server/logger.js';

const urls = [
    "public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png",
    "public/spa/spa-lotus-plain.svg"
];

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

    let signedUrls = {};
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        logger.error({ statusText: res.statusText }, 'Failed to retrieve signed URLs');
    } else {
        ({ signedUrls } = await res.json());
    }

    return { signedUrls, menu };
}
