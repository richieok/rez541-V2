import { model, Schema } from 'mongoose'

const preBookingSchema = new Schema(
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
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        collection: 'pre_bookings'
    }
);

preBookingSchema.index({ token: 1, status: 1 });

export const preBooking = model('PreBooking', preBookingSchema);
