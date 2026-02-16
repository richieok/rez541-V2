import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const { slug } = params;
    if (!slug) {
        throw redirect(307, '/rooms');
    }
    const res = await fetch(`http://backend:4000/api/rez541/v1.1/getroombyid/id/${slug}`)
    if (!res.ok) {
        return {}
    }
    const { room } = await res.json()
    return { room }
}

