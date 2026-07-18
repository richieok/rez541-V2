import { retrieveSignedUrls } from '$lib/server/signing.js';
import { getHeroImage } from '$lib/server/bookingApp.js';
import logger from '$lib/server/logger.js';

// Falls back to the current default photo if the backend/database is
// unreachable, so the home page still renders a hero image.
const DEFAULT_HERO_IMAGE = "public/spa/reception3.jpg";

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
    let heroImage = DEFAULT_HERO_IMAGE;
    try {
        heroImage = await getHeroImage();
    } catch (error) {
        logger.error({ err: error }, 'Failed to retrieve hero image from backend, using default');
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
        amenitiesDataArray
    };
}
