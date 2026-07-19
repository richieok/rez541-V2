import { model, Schema } from 'mongoose'

const siteSettingsSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        // Example: "home_hero_image"
    },
    values: {
        type: [String],
        required: true,
        // A single-image setting is just a one-entry array.
        // Example: ["public/spa/reception3.jpg"]
        // Example: ["public/spa/living-room.jpg", "public/spa/scrub-room2.jpg"]
    },
}, {
    timestamps: true,
    collection: 'site_settings',
})

export const SiteSettings = model('SiteSettings', siteSettingsSchema);
