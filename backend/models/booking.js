import { model, Schema } from 'mongoose'

const BookingSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
            // Example: "abc123xyz456"
        },
        email: {
            type: String,
            required: true,
            // Example: "example@example.com"
        },
        checkIn: {
            type: Date,
            required: true,
            index: true,
            // Example: "2023-05-01T00:00:00.000Z"
        },
        checkOut: {
            type: Date,
            required: true,
            index: true,
            // Example: "2023-05-02T00:00:00.000Z"
        },
        isVerified: {
            type: Boolean,
            default: false,
            // Indicates if the booking has been verified
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from creation
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        collection: 'bookings'
    }
)

BookingSchema.index({ token: 1, status: 1 });

export const Booking = model('Booking', BookingSchema)
