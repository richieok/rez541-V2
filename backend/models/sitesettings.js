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
        required: true,
        // Example: "public/spa/reception3.jpg"
    },
}, {
    timestamps: true,
    collection: 'site_settings',
})

export const SiteSettings = model('SiteSettings', siteSettingsSchema);
