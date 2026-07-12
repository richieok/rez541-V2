import { SpaBooking } from "../models/spabooking.js"
import { spaMenu, spaServices, findServiceById, SPA_OPEN_HOUR, SPA_CLOSE_HOUR, SLOT_INTERVAL_MINUTES } from "./services.js"

// Slot times are treated as UTC throughout so behaviour doesn't depend on
// the server's timezone. Labels like "09:00" are spa wall-clock times.
const MS_PER_MINUTE = 60 * 1000

function spaCapacity() {
    const capacity = Number(process.env.SPA_CAPACITY)
    return Number.isInteger(capacity) && capacity > 0 ? capacity : 2
}

function generateUrlSafeToken(byteLength = 12) {
    const buffer = crypto.getRandomValues(new Uint8Array(byteLength));
    return Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Bookings that still hold a slot: verified ones, plus unverified ones whose
// verification window hasn't lapsed yet.
function activeBookingFilter() {
    return {
        $or: [
            { isVerified: true },
            { expiresAt: { $gt: new Date() } }
        ]
    }
}

function countOverlapping(bookings, slotStartMs, slotEndMs) {
    return bookings.filter(booking =>
        booking.startsAt.getTime() < slotEndMs && booking.endsAt.getTime() > slotStartMs
    ).length
}

export const getSpaServices = (req, res, next) => {
    req.build.spaServices = spaServices
    next()
}

export const getSpaMenu = (req, res, next) => {
    req.build.spaMenu = spaMenu
    next()
}

export const getSpaAvailability = async (req, res, next) => {
    try {
        const { serviceId, date } = req.query
        const service = findServiceById(serviceId)
        if (!service) {
            return res.status(400).json({ message: 'Unknown or missing serviceId' })
        }
        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ message: 'date query parameter must be YYYY-MM-DD' })
        }

        const open = new Date(`${date}T00:00:00Z`)
        open.setUTCHours(SPA_OPEN_HOUR)
        const close = new Date(`${date}T00:00:00Z`)
        close.setUTCHours(SPA_CLOSE_HOUR)
        if (Number.isNaN(open.getTime())) {
            return res.status(400).json({ message: 'Invalid date' })
        }

        const bookings = await SpaBooking.find({
            startsAt: { $lt: close },
            endsAt: { $gt: open },
            ...activeBookingFilter()
        })

        const capacity = spaCapacity()
        const now = Date.now()
        const durationMs = service.durationMinutes * MS_PER_MINUTE
        const slots = []
        for (let startMs = open.getTime(); startMs + durationMs <= close.getTime(); startMs += SLOT_INTERVAL_MINUTES * MS_PER_MINUTE) {
            if (startMs <= now) continue
            if (countOverlapping(bookings, startMs, startMs + durationMs) >= capacity) continue
            const slotDate = new Date(startMs)
            const label = `${String(slotDate.getUTCHours()).padStart(2, '0')}:${String(slotDate.getUTCMinutes()).padStart(2, '0')}`
            slots.push({ startsAt: slotDate.toISOString(), label })
        }

        req.build.availability = {
            serviceId: service.id,
            serviceName: service.name,
            durationMinutes: service.durationMinutes,
            date,
            slots
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const verifySpaBooking = async (req, res, next) => {
    const { bookingObj } = req.body
    if (!bookingObj) {
        return res.status(400).json({ message: 'No booking data provided' })
    }
    const { firstName, lastName, email, phone, serviceId, startsAt } = bookingObj
    if (!firstName || !lastName || !email || !phone || !serviceId || !startsAt) {
        return res.status(400).json({ message: 'Missing required booking fields' })
    }
    const service = findServiceById(serviceId)
    if (!service) {
        return res.status(400).json({ message: 'Unknown serviceId' })
    }
    const start = new Date(startsAt)
    if (Number.isNaN(start.getTime())) {
        return res.status(400).json({ message: 'Invalid startsAt' })
    }
    if (start.getTime() <= Date.now()) {
        return res.status(400).json({ message: 'The requested time slot is in the past' })
    }
    const end = new Date(start.getTime() + service.durationMinutes * MS_PER_MINUTE)
    const openMinutes = start.getUTCHours() * 60 + start.getUTCMinutes()
    const endMinutes = openMinutes + service.durationMinutes
    if (openMinutes < SPA_OPEN_HOUR * 60 || endMinutes > SPA_CLOSE_HOUR * 60 || openMinutes % SLOT_INTERVAL_MINUTES !== 0) {
        return res.status(400).json({ message: 'The requested time slot is outside spa hours' })
    }

    try {
        const overlapping = await SpaBooking.countDocuments({
            startsAt: { $lt: end },
            endsAt: { $gt: start },
            ...activeBookingFilter()
        })
        if (overlapping >= spaCapacity()) {
            return res.status(409).json({ message: 'That time slot is no longer available. Please pick another.' })
        }

        const token = generateUrlSafeToken()
        const booking = new SpaBooking({
            token,
            firstName,
            lastName,
            email,
            phone,
            serviceId: service.id,
            serviceName: service.name,
            durationMinutes: service.durationMinutes,
            price: service.price,
            startsAt: start,
            endsAt: end,
        })
        await booking.save()

        req.locals.spaBooking = booking.toObject()
        next()
    } catch (error) {
        console.error('Error creating spa booking\n', error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const confirmSpaBooking = async (req, res, next) => {
    const { bookingToken } = req.body
    if (!bookingToken) {
        return res.status(400).json({ message: 'No booking token provided' })
    }
    try {
        const booking = await SpaBooking.findOne({ token: bookingToken })
        if (!booking) {
            return res.status(404).json({ message: 'Spa booking not found' })
        }
        if (booking.isVerified) {
            return res.status(200).json({ message: 'Spa booking already verified' })
        }
        if (booking.expiresAt < new Date()) {
            return res.status(410).json({ message: 'This verification link has expired. Please book again.' })
        }
        booking.isVerified = true
        await booking.save()
        req.locals.spaBooking = booking.toObject()
        req.build.bookingMessage = "Spa booking confirmed successfully"
        next()
    } catch (error) {
        next(error)
    }
}
