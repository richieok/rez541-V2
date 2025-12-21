import { json } from '@sveltejs/kit';
import { retrieveSignedUrls } from "$lib/server/signing.js"

// export async function POST({ request }) {
//     let { uris } = await request.json()
//     console.log('Received URIs:', uris);
//     // console.log(uris)
//     let { signedUrls } = await retrieveSignedUrls(uris)
//     console.log("+app/signurls", signedUrls)
//     return json(signedUrls)
// }


export async function POST({ request }) {
    let { uris } = await request.json()
    console.log('Received URIs:', uris);
    // console.log(uris)
    const res = await fetch('http://backend:4000/api/rez541/v1.1/signurls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: uris })
    });
    if (!res.ok) {
        console.error(res.status)
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return json({ error: res.statusText }, { status: res.status });
    }
    let data = await res.json();
    const { signedUrls } = data
    return json(signedUrls)
}