// Seeds the spabookings collection with made-up data for testing the spa
// booking system. Dates are relative to today so re-running always produces
// bookings in the near future.
//
// Run inside the fake-db dev stack (see compose.fakedb.yml):
//   docker compose -f compose.yml -f compose.fakedb.yml exec backend npm run seed:spa
//
// Or from the host against the exposed container port:
//   DB_URI=mongodb://localhost:27017/rez541db npm run seed:spa

import mongoose from 'mongoose'
import { SpaBooking } from './models/spabooking.js'
import { findServiceById } from './spa/services.js'

const DB_URI = process.env.DB_URI

if (!DB_URI) {
    throw new Error('DB_URI environment variable is not set — refusing to guess which database to seed')
}
if (DB_URI.startsWith('mongodb+srv://')) {
    throw new Error('DB_URI points at an Atlas cluster — this seed script wipes spabookings and only runs against a local database')
}

const MS_PER_MINUTE = 60 * 1000
const MS_PER_DAY = 24 * 60 * MS_PER_MINUTE

// A booking for `serviceId` starting at hh:mm UTC, `dayOffset` days from today.
function fakeBooking({ token, firstName, lastName, email, phone, serviceId, dayOffset, time, isVerified = false, expired = false }) {
    const service = findServiceById(serviceId)
    if (!service) {
        throw new Error(`Unknown serviceId in seed data: ${serviceId}`)
    }
    const [hours, minutes] = time.split(':').map(Number)
    const startsAt = new Date(Date.now() + dayOffset * MS_PER_DAY)
    startsAt.setUTCHours(hours, minutes, 0, 0)
    const endsAt = new Date(startsAt.getTime() + service.durationMinutes * MS_PER_MINUTE)
    return {
        token,
        firstName,
        lastName,
        email,
        phone,
        serviceId: service.id,
        serviceName: service.name,
        durationMinutes: service.durationMinutes,
        price: service.price,
        startsAt,
        endsAt,
        isVerified,
        // Expired unverified bookings no longer hold a slot; the availability
        // endpoint should treat those slots as free again.
        expiresAt: expired ? new Date(Date.now() - 60 * MS_PER_MINUTE) : new Date(Date.now() + 24 * 60 * MS_PER_MINUTE),
    }
}

const bookings = [
    // Yesterday, already happened — history that must not affect availability.
    fakeBooking({ token: 'seed-past-0001', firstName: 'Ngozi', lastName: 'Eze', email: 'ngozi.eze@example.com', phone: '+2348010000001', serviceId: 'swedish-60', dayOffset: -1, time: '10:00', isVerified: true }),

    // Tomorrow 09:00 — two verified bookings overlap, so with the default
    // SPA_CAPACITY of 2 every slot they cover should show as unavailable.
    fakeBooking({ token: 'seed-full-0001', firstName: 'Ada', lastName: 'Obi', email: 'ada.obi@example.com', phone: '+2348010000002', serviceId: 'swedish-60', dayOffset: 1, time: '09:00', isVerified: true }),
    fakeBooking({ token: 'seed-full-0002', firstName: 'Bola', lastName: 'Adeyemi', email: 'bola.adeyemi@example.com', phone: '+2348010000003', serviceId: 'deep-tissue-60', dayOffset: 1, time: '09:00', isVerified: true }),

    // Tomorrow 10:30 — single verified booking, slot half-occupied.
    fakeBooking({ token: 'seed-half-0001', firstName: 'Chinedu', lastName: 'Okafor', email: 'chinedu.okafor@example.com', phone: '+2348010000004', serviceId: 'hot-stone-90', dayOffset: 1, time: '10:30', isVerified: true }),

    // Tomorrow 12:30 — unverified but still inside its verification window,
    // so it holds the slot like a verified booking.
    fakeBooking({ token: 'seed-pending-0001', firstName: 'Funke', lastName: 'Alabi', email: 'funke.alabi@example.com', phone: '+2348010000005', serviceId: 'pregnancy-45', dayOffset: 1, time: '12:30' }),

    // Tomorrow 15:00 — unverified AND expired, so it must NOT hold the slot.
    fakeBooking({ token: 'seed-expired-0001', firstName: 'Emeka', lastName: 'Nwosu', email: 'emeka.nwosu@example.com', phone: '+2348010000006', serviceId: 'swedish-30', dayOffset: 1, time: '15:00', expired: true }),

    // Day after tomorrow — a facial and a package booking.
    fakeBooking({ token: 'seed-later-0001', firstName: 'Yemi', lastName: 'Balogun', email: 'yemi.balogun@example.com', phone: '+2348010000007', serviceId: 'korean-express-facial-45', dayOffset: 2, time: '11:00', isVerified: true }),
    fakeBooking({ token: 'seed-later-0002', firstName: 'Amina', lastName: 'Suleiman', email: 'amina.suleiman@example.com', phone: '+2348010000008', serviceId: 'thermal-recovery-180', dayOffset: 2, time: '14:00', isVerified: true }),
]

try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 })
    console.log(`Connected to ${DB_URI}`)

    const { deletedCount } = await SpaBooking.deleteMany({})
    console.log(`Cleared ${deletedCount} existing spa booking(s)`)

    const inserted = await SpaBooking.insertMany(bookings)
    console.log(`Inserted ${inserted.length} fake spa booking(s):`)
    for (const booking of inserted) {
        const flags = [booking.isVerified ? 'verified' : 'unverified', booking.expiresAt < new Date() ? 'expired' : null].filter(Boolean).join(', ')
        console.log(`  ${booking.token}  ${booking.startsAt.toISOString()}  ${booking.serviceName} (${booking.durationMinutes} mins)  ${booking.fullName}  [${flags}]`)
    }
} finally {
    await mongoose.disconnect()
}
