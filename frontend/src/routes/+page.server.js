const retrieveSignedUrls = async (urls) => {
    let res = await fetch('http://backend:4000/api/rez541/v1/signurls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: urls })
    });
    if (res.ok) {
        let data = await res.json();
        return data.signedUrls;
    } else {
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return [];
    }
}

const urls = [
    "public/3-bed-suite/bathroom-2.jpg",
    "public/3-bed-suite/closet-3-bed.jpg",
    "public/3-bed-suite/kitchen-3-bed.jpg"
]

export const load = async () => {
    const signedUrls = await retrieveSignedUrls(urls);
    return {
        signedUrls
    };
}