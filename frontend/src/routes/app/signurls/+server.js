import { json } from '@sveltejs/kit';
import logger from '$lib/server/logger.js';

export async function POST({ request, fetch }) {
    let { uris } = await request.json()
    const res = await fetch('http://backend:4000/api/rez541/v1.1/signurls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: uris })
    });
    if (!res.ok) {
        logger.error({ status: res.status, statusText: res.statusText }, 'Failed to retrieve signed URLs from backend');
        return json({ error: res.statusText }, { status: res.status });
    }
    let data = await res.json();
    const { signedUrls } = data
    return json(signedUrls)
}