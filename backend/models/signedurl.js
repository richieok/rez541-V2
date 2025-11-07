import { model, Schema } from 'mongoose'

const signedUrlSchema = new Schema({
    imageUri: {
        type: String,
        required: true,
        index: true,
        unique: true,
        // Example: "/public/star.jpg"
    },
    imagePath: {
        type: String,
        required: true,
        // Full path or S3 key: "uploads/images/star.jpg"
    },
    mimeType: {
        type: String,
        default: 'image/jpeg',
        // 'image/jpeg', 'image/png', 'image/webp', etc.
    },
    fileSize: {
        type: Number,
        // Size in bytes
    },

    // Signed URL details
    signedUrl: {
        type: String,
        required: true,
        unique: true,
        // The full signed URL
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

    maxUses: {
        type: Number,
        default: null,
        // null means unlimited uses
    }
}, {
    timestamps: true, // Adds updatedAt automatically
    collection: 'signed_urls',
})

// Indexes for common queries
signedUrlSchema.index({ imageUri: 1, status: 1 });
// signedUrlSchema.index({ signatureToken: 1, status: 1 });
signedUrlSchema.index({ expiresAt: 1, status: 1 });
signedUrlSchema.index({ userId: 1, createdAt: -1 });

// Virtual for checking if URL is valid
signedUrlSchema.virtual('isValid').get(function () {
    return (
        this.expiresAt > new Date()
    );
});

// Static method to find by image URI
signedUrlSchema.statics.findByImageUri = function (uri) {
    const query = { imageUri: uri };

    // query.expiresAt = { $gt: new Date() };

    return this.find(query).sort({ createdAt: -1 });
};

export const SignedUrl = model('SignedUrl', signedUrlSchema);
