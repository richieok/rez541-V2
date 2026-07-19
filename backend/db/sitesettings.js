import { SiteSettings } from "../models/sitesettings.js";
import { retrieveSignedUrls } from "../managerS3.js";

// Falls back to these defaults if a key is missing from the site_settings
// collection (e.g. on a fresh database). seedSiteSettings.js seeds this same
// object, so there is exactly one place default image keys are declared.
export const DEFAULTS = {
    home_hero_image: ["public/spa/reception3.jpg"],
    home_collage_images: [
        "public/3-bed-suite/living-room-3-bed.jpg",
        "public/exterior/block1-view-800w.jpg",
    ],
    spa_hero_image: ["public/spa/scrub-room.jpg"],
    spa_lotus_image: ["public/spa/spa-lotus-plain.svg"],
    spa_gallery_images: [
        "public/spa/living-room.jpg",
        "public/spa/scrub-room-shot.jpg",
        "public/spa/scrub-room2.jpg",
    ],
    spa_service_menu_hero_image: ["public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png"],
}

// Reads several keys in a single query, falling back to DEFAULTS for any key
// missing from the collection. Returns { [key]: string[] }.
const getSettings = async (keys) => {
    const docs = await SiteSettings.find({ key: { $in: keys } });
    const found = new Map(docs.map((doc) => [doc.key, doc.values]));
    return Object.fromEntries(keys.map((key) => [key, found.get(key) ?? DEFAULTS[key]]));
}

// Signs the above-the-fold keys server-side so pages can start downloading
// them with the first paint. A signing failure degrades to "no photo" rather
// than failing the whole request, since the settings lookup already succeeded.
const signKeys = async (req, keys, label) => {
    try {
        return await retrieveSignedUrls(keys.filter(Boolean));
    } catch (error) {
        req.log.error({ err: error }, `Error signing ${label}`);
        return {};
    }
}

export const buildHomeImages = async (req, res, next) => {
    try {
        const settings = await getSettings(["home_hero_image", "home_collage_images"]);
        req.build.heroImage = settings.home_hero_image[0];
        req.build.collageImages = settings.home_collage_images;
        req.build.signedUrls = await signKeys(req, [req.build.heroImage], "home hero image");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building home images");
        next(error);
    }
}

export const buildSpaImages = async (req, res, next) => {
    try {
        const settings = await getSettings(["spa_hero_image", "spa_lotus_image", "spa_gallery_images"]);
        req.build.heroImage = settings.spa_hero_image[0];
        req.build.lotusImage = settings.spa_lotus_image[0];
        req.build.galleryImages = settings.spa_gallery_images;
        req.build.signedUrls = await signKeys(req, [req.build.heroImage, req.build.lotusImage], "spa hero/lotus images");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building spa images");
        next(error);
    }
}

export const buildServiceMenuImages = async (req, res, next) => {
    try {
        const settings = await getSettings(["spa_service_menu_hero_image", "spa_lotus_image"]);
        req.build.heroImage = settings.spa_service_menu_hero_image[0];
        req.build.lotusImage = settings.spa_lotus_image[0];
        req.build.signedUrls = await signKeys(req, [req.build.heroImage, req.build.lotusImage], "service menu hero/lotus images");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building spa service menu images");
        next(error);
    }
}
