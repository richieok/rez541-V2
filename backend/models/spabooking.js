import { model, Schema } from 'mongoose'

const SpaBookingSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        serviceId: {
            type: String,
            required: true,
            // Example: "swedish-60"
        },
        serviceName: {
            type: String,
            required: true,
            // Example: "Swedish Massage (60 mins)"
        },
        durationMinutes: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        startsAt: {
            type: Date,
            required: true,
            index: true,
        },
        endsAt: {
            type: Date,
            required: true,
            index: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours to verify
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        collection: 'spabookings'
    }
)

SpaBookingSchema.index({ startsAt: 1, endsAt: 1 });

SpaBookingSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

SpaBookingSchema.set('toJSON', { virtuals: true });
SpaBookingSchema.set('toObject', { virtuals: true });

export const SpaBooking = model('SpaBooking', SpaBookingSchema)
