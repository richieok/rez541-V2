// Seeds the room_types collection so /rooms works against the fake local
// database. The imageList keys point at the real objects in the production
// S3 bucket — image signing doesn't go through the database, so signed URLs
// (and therefore room photos) work locally as long as backend/.env has valid
// AWS credentials.
//
// Run inside the fake-db dev stack (see compose.fakedb.yml):
//   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:rooms
//
// Or from the host against the exposed container port:
//   DB_URI=mongodb://localhost:27017/rez541db npm run seed:rooms

import mongoose from 'mongoose'
import { RoomType } from './models/roomtype.js'

const DB_URI = process.env.DB_URI

if (!DB_URI) {
    throw new Error('DB_URI environment variable is not set — refusing to guess which database to seed')
}
if (DB_URI.startsWith('mongodb+srv://')) {
    throw new Error('DB_URI points at an Atlas cluster — this seed script wipes room_types and only runs against a local database')
}

// Snapshot of the production room catalogue (Atlas room_types, 2026-07-14).
const roomTypes = [
    {
        id: 1,
        name: 'superior suite',
        description: 'A luxurious suite with modern amenities.',
        capacity: 2,
        pricePerNight: 65000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/superior-suite/living-room-1.jpg',
            'public/superior-suite/living-room-kitchen.jpg',
        ],
    },
    {
        id: 2,
        name: 'deluxe room',
        description: 'A luxurious suite with modern amenities.',
        capacity: 2,
        pricePerNight: 50000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/deluxe-room/bedroom-1.jpg',
            'public/deluxe-room/bedroom-2.jpg',
            'public/deluxe-room/studio-view-1-400w.jpg',
            'public/deluxe-room/bathroom.jpg',
        ],
    },
    {
        id: 3,
        name: 'standard room',
        description: 'A standard suite with modern amenities.',
        capacity: 2,
        pricePerNight: 40000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/standard-room/bedroom-st.jpg',
        ],
    },
    {
        id: 4,
        name: 'two bedroom',
        description: 'A spacious Two bedroom with premium facilities.',
        capacity: 4,
        pricePerNight: 95000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/2-bedroom-suite/bedroom-gf.jpg',
            'public/2-bedroom-suite/dining-blk-a.jpg',
            'public/2-bedroom-suite/living-room-blk-b-2.jpg',
            'public/2-bedroom-suite/living-room-blk-b.jpg',
        ],
    },
    {
        id: 5,
        name: 'three bedroom',
        description: 'A Three bedroom with premium facilities.',
        capacity: 6,
        pricePerNight: 150000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/3-bed-suite/room-1-bed.jpg',
            'public/3-bed-suite/room-1.jpg',
            'public/3-bed-suite/room-3-bed-2.jpg',
            'public/3-bed-suite/room-3-bed.jpg',
            'public/3-bed-suite/living-room-3-bed.jpg',
            'public/3-bed-suite/kitchen-3-bed.jpg',
            'public/3-bed-suite/closet-3-bed.jpg',
            'public/3-bed-suite/bathroom-2.jpg',
        ],
    },
    {
        id: 6,
        name: 'four bedroom apartment',
        description: 'A Four bedroom terrace with premium facilities.',
        capacity: 8,
        pricePerNight: 300000,
        amenities: ['Wi-Fi', 'Air Conditioning'],
        imageList: [
            'public/4-bedroom-apartment/living-room.jpg',
            'public/4-bedroom-apartment/living-room-2.jpg',
            'public/4-bedroom-apartment/dining-area-1.jpg',
            'public/4-bedroom-apartment/kitchen.jpg',
        ],
    },
]

try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 })
    console.log(`Connected to ${DB_URI}`)

    const { deletedCount } = await RoomType.deleteMany({})
    console.log(`Cleared ${deletedCount} existing room type(s)`)

    const inserted = await RoomType.insertMany(roomTypes)
    console.log(`Inserted ${inserted.length} room type(s):`)
    for (const room of inserted) {
        console.log(`  ${room.id}  ${room.name}  ₦${room.pricePerNight}/night  ${room.imageList.length} image(s)`)
    }
} finally {
    await mongoose.disconnect()
}
