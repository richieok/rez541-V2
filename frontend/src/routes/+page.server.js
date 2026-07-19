import { retrieveSignedUrls } from '$lib/server/signing.js';
import { getHomeImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

// Falls back to these defaults if the backend/database is unreachable, so
// the home page still renders images.
const DEFAULT_HOME_IMAGES = {
    heroImage: "public/spa/reception3.jpg",
    collageImages: [
        "public/3-bed-suite/living-room-3-bed.jpg",
        "public/exterior/block1-view-800w.jpg",
    ],
};

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
    let { heroImage, collageImages } = DEFAULT_HOME_IMAGES;
    try {
        ({ heroImage, collageImages } = await getHomeImages());
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve home images from backend, using defaults');
    }

    // Only the hero is signed server-side so it can start downloading with the
    // first paint; the collage images resolve client-side via <SignedImage>.
    const res = await retrieveSignedUrls([heroImage]);
    if (res.error) {
        logger.error({ statusText: res.statusText }, 'Failed to retrieve signed URLs');
        return {};
    }
    const { signedUrls } = await res.json();
    return {
        signedUrls,
        heroImage,
        collageImages,
        amenitiesDataArray
    };
}
