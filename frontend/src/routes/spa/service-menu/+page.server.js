import { retrieveSignedUrls } from '$lib/server/signing.js';

const urls = [
    "public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png",
    "public/spa/spa-lotus-plain.svg"
];

export async function load() {
    let menu = null;
    try {
        const menuRes = await fetch('http://backend:4000/api/rez541/v1.1/spa/menu');
        if (menuRes.ok) {
            ({ spaMenu: menu } = await menuRes.json());
        } else {
            console.error('Failed to fetch spa menu:', menuRes.status);
        }
    } catch (error) {
        console.error('Failed to fetch spa menu:', error.message);
    }

    let signedUrls = {};
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        console.error('Failed to retrieve signed URLs:', res.statusText);
    } else {
        ({ signedUrls } = await res.json());
    }

    return { signedUrls, menu };
}
