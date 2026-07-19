import { SiteSettings } from "../models/sitesettings.js";

// Falls back to these defaults if a key is missing from the site_settings
// collection yet (e.g. on a fresh database).
const DEFAULTS = {
    home_hero_image: "public/spa/reception3.jpg",
    home_collage_images: [
        "public/3-bed-suite/living-room-3-bed.jpg",
        "public/exterior/block1-view-800w.jpg",
    ],
    spa_hero_image: "public/spa/scrub-room.jpg",
    spa_lotus_image: "public/spa/spa-lotus-plain.svg",
    spa_gallery_images: [
        "public/spa/living-room.jpg",
        "public/spa/scrub-room-shot.jpg",
        "public/spa/scrub-room2.jpg",
    ],
    spa_service_menu_hero_image: "public/spa/Gemini_Generated_Image_o7r9y0o7r9y0o7r9.png",
}

const getSettingValue = async (key) => {
    const setting = await SiteSettings.findOne({ key });
    return setting?.value || DEFAULTS[key];
}

const getSettingValues = async (key) => {
    const setting = await SiteSettings.findOne({ key });
    return setting?.values?.length ? setting.values : DEFAULTS[key];
}

export const buildHomeImages = async (req, res, next) => {
    try {
        req.build.heroImage = await getSettingValue("home_hero_image");
        req.build.collageImages = await getSettingValues("home_collage_images");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building home images");
        next(error);
    }
}

export const buildSpaImages = async (req, res, next) => {
    try {
        req.build.heroImage = await getSettingValue("spa_hero_image");
        req.build.lotusImage = await getSettingValue("spa_lotus_image");
        req.build.galleryImages = await getSettingValues("spa_gallery_images");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building spa images");
        next(error);
    }
}

export const buildServiceMenuImages = async (req, res, next) => {
    try {
        req.build.heroImage = await getSettingValue("spa_service_menu_hero_image");
        req.build.lotusImage = await getSettingValue("spa_lotus_image");
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building spa service menu images");
        next(error);
    }
}
