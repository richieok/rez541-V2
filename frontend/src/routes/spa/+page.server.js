import { retrieveSignedUrls } from '$lib/server/signing.js';
import logger from '$lib/server/logger.js';

// Only the above-the-fold hero images are signed server-side so they can
// start downloading with the first paint; the gallery resolves client-side
// via <SignedImage>.
let urls = [
    "public/spa/scrub-room.jpg",
    "public/spa/spa-lotus-plain.svg"
]
export async function load() {
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        logger.error({ statusText: res.statusText }, 'Failed to retrieve signed URLs');
        return {};
    }
    const { signedUrls } = await res.json();
    return {
        signedUrls
    };
}
