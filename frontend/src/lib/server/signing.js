import { json } from '@sveltejs/kit';
import logger from '$lib/server/logger.js';

export const retrieveSignedUrls = async (urls) => {
    let res = await fetch('http://backend:4000/api/rez541/v1.1/signurls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: urls })
    });
    if (res.ok) {
        let data = await res.json();
        return json(data);
    } else {
        logger.error({ status: res.status, statusText: res.statusText, uriCount: urls.length }, 'Failed to retrieve signed URLs from backend');
        return {"error": true};
    }
}