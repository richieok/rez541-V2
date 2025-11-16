import { model, Schema } from 'mongoose'

const roomTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            // Example: "Deluxe Suite"
        },
        description: {
            type: String,
            required: false,
            // Example: "A spacious suite with ocean view"
        },
        capacity: {
            type: Number,
            required: true,
            // Example: 4
        },
        pricePerNight: {
            type: Number,
            required: true,
            // Example: 250.00
        },
        amenities: {
            type: [String],
            required: false,
            // Example: ["WiFi", "Air Conditioning", "Breakfast Included"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: true,
        }
    },
    {
        timestamps: true,
        collection: 'room_types'
    }
);

roomTypeSchema.index({ name: 1 });

export const RoomType = model('RoomType', roomTypeSchema);
