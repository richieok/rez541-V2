import { model, Schema } from 'mongoose'

const siteSettingsSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        index: true,
        // Example: "home_hero_image"
    },
    value: {
        type: String,
        // Example: "public/spa/reception3.jpg"
        // Used for single-image settings; mutually exclusive with `values`.
    },
    values: {
        type: [String],
        // Example: ["public/spa/living-room.jpg", "public/spa/scrub-room2.jpg"]
        // Used for gallery/collage settings; mutually exclusive with `value`.
    },
}, {
    timestamps: true,
    collection: 'site_settings',
})

export const SiteSettings = model('SiteSettings', siteSettingsSchema);
