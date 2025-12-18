export const retrieveSignedUrls = async (urls) => {
    console.log("retrieveSignedUrls urls ➡️", urls)
    let res = await fetch('http://backend:4000/api/rez541/v1/signurls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: urls })
    });
    if (res.ok) {
        let data = await res.json();
        const { signedUrls } = data
        return json(signedUrls);
    } else {
        console.error(res.status)
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return {"error": true};
    }
}