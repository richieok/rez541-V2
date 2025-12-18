import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const { slug } = params;
    if (!slug) {
        throw redirect(307, '/rooms');
    }
    console.log("Slug:", slug);
    const res = await fetch(`http://backend:4000/api/rez541/v1/getroombyid/id/${slug}`)
    if (!res.ok) {
        console.log("error: ", res.status)
        return {}
    }
    const room = await res.json()
    console.log(room)
    return { room }
}

