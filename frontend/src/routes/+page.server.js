import { retrieveSignedUrls } from '$lib/server/signing.js';

// Only the hero is signed server-side so it can start downloading with the
// first paint; the collage images resolve client-side via <SignedImage>.
const urls = [
    "public/spa/reception3.jpg"
]

const amenitiesDataArray = [
    {
        icon: 'fa-solid fa-utensils fa-lg',
        title: 'Restaurant & Dining',
        description: 'Savor exquisite cuisine in our elegant restaurant featuring local and international dishes'
    },
    {
        icon: 'fa-solid fa-person-swimming fa-lg',
        title: 'Swimming Pool',
        description: 'Relax and unwind in our pristine medium-sized pool with comfortable lounging areas'
    },
    {
        icon: 'fa-solid fa-spa fa-lg',
        title: 'Spa & Wellness',
        description: 'Rejuvenate your body and mind with our premium spa treatments and therapies'
    },
    {
        icon: 'fa-solid fa-wifi fa-lg',
        title: 'Free High-Speed WiFi',
        description: 'Stay connected with complimentary high-speed internet throughout the property'
    }
]

export const load = async () => {
    const res = await retrieveSignedUrls(urls);
    if (res.error) {
        console.error('Failed to retrieve signed URLs:', res.statusText);
        return {};
    }
    const { signedUrls } = await res.json();
    return {
        signedUrls,
        amenitiesDataArray
    };
}
