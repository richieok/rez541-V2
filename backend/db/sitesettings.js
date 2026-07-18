import { SiteSettings } from "../models/sitesettings.js";

// Falls back to the current default hero photo if nothing is set in the
// site_settings collection yet (e.g. on a fresh database).
const HOME_HERO_IMAGE_KEY = "home_hero_image";
const DEFAULT_HOME_HERO_IMAGE = "public/spa/reception3.jpg";

export const buildHeroImage = async (req, res, next) => {
    try {
        const setting = await SiteSettings.findOne({ key: HOME_HERO_IMAGE_KEY });
        req.build.heroImage = setting?.value || DEFAULT_HOME_HERO_IMAGE;
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building hero image");
        next(error);
    }
}
