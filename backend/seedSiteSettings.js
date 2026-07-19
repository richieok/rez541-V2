// Seeds the site_settings collection with the configurable image keys used
// across the frontend (home hero/collage, spa hero/gallery, etc.), so their
// values can be changed later by editing the database (e.g. via
// mongo-express in the fake-db stack) instead of redeploying code.
//
// Run inside the fake-db dev stack (see compose.fakedb.yml):
//   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:site-settings
//
// Or from the host against the exposed container port:
//   DB_URI=mongodb://localhost:27017/rez541db npm run seed:site-settings

import mongoose from 'mongoose'
import { SiteSettings } from './models/sitesettings.js'
import { DEFAULTS } from './db/sitesettings.js'

const DB_URI = process.env.DB_URI

if (!DB_URI) {
    throw new Error('DB_URI environment variable is not set — refusing to guess which database to seed')
}
if (DB_URI.startsWith('mongodb+srv://')) {
    throw new Error('DB_URI points at an Atlas cluster — this seed script only runs against a local database')
}

try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 })
    console.log(`Connected to ${DB_URI}`)

    for (const [key, values] of Object.entries(DEFAULTS)) {
        const setting = await SiteSettings.findOneAndUpdate(
            { key },
            { key, values },
            { upsert: true, new: true }
        )
        console.log(`Set ${setting.key} = [${setting.values.join(', ')}]`)
    }
} finally {
    await mongoose.disconnect()
}
