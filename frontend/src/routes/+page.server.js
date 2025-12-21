import { retrieveSignedUrls } from '$lib/server/signing.js';

// const retrieveSignedUrls = async (urls) => {
//     let res = await fetch('http://backend:4000/api/rez541/v1.1/signurls', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ uris: urls })
//     });
//     if (res.ok) {
//         let data = await res.json();
//         return data.signedUrls;
//     } else {
//         console.error('Failed to retrieve signed URLs:', res.statusText);
//         return {};
//     }
// }

const urls = [
    "public/3-bed-suite/living-room-3-bed.jpg",
    "public/exterior/block1-view-800w.jpg",
    "public/3-bed-suite/kitchen-3-bed.jpg",
    "public/2-bedroom-suite/bedroom-gf-800w.jpg"
]

export const load = async () => {
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return {};
    }
    const { signedUrls } = await res.json();
    console.log("signedUrls      ------>", signedUrls)
    return {
        signedUrls
    };
}