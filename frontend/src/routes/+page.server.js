import { getHomeImages } from '$lib/server/api.js';
import logger from '$lib/server/logger.js';

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
    // Hero and collage keys plus the signed hero URL now come from a single
    // backend call; on failure we degrade to no images rather than a
    // hardcoded fallback photo the backend may no longer even serve.
    let { heroImage, collageImages, signedUrls } = { collageImages: [], signedUrls: {} };
    try {
        ({ heroImage, collageImages, signedUrls } = await getHomeImages());
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve home images from backend');
    }

    return {
        signedUrls,
        heroImage,
        collageImages,
        amenitiesDataArray
    };
}
