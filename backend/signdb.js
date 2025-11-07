import { DB_URI } from './initDB.js'
import { SignedUrl } from './models/signedurl.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

export const findSignedUrlByImageUri = async (imageUri) => {
    return SignedUrl.findByImageUri(imageUri);
}