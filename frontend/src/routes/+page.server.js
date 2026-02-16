import { retrieveSignedUrls } from '$lib/server/signing.js';

const urls = [
    "public/spa/reception3.jpg",
    "public/3-bed-suite/living-room-3-bed.jpg",
    "public/exterior/block1-view-800w.jpg",
    "public/3-bed-suite/kitchen-3-bed.jpg",
    "public/2-bedroom-suite/bedroom-gf-800w.jpg"
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
    // console.log("signedUrls      ------>", signedUrls)
    return {
        signedUrls,
        amenitiesDataArray
    };
}