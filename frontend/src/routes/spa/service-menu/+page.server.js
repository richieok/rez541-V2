import { retrieveSignedUrls } from '$lib/server/signing.js';

const urls = [
    "public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png",
    "public/spa/spa-lotus-plain.svg"
];

export async function load() {
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return {};
    }
    const { signedUrls } = await res.json();
    return { signedUrls };
}
