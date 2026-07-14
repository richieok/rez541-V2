import { retrieveSignedUrls } from '$lib/server/signing.js';

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
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return {};
    }
    const { signedUrls } = await res.json();
    return {
        signedUrls
    };
}
