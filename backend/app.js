import express from 'express';
import mongoose from "mongoose"
const { connect, connection } = mongoose
import { createServer } from 'node:http'
import multer from 'multer'
import { loadParameters } from "./cloud.js"
import { sendBuild, setBuild } from "./db/build.js"

const INITIAL_RETRY_DELAY_MS = 5000
const MAX_RETRY_DELAY_MS = 60000

async function connectWRetry(DB_URI, onFirstConnect) {
    let delay = INITIAL_RETRY_DELAY_MS
    for (;;) {
        try {
            await connect(DB_URI, { serverSelectionTimeoutMS: 5000 })
            console.log("Connected to MongoDB")
        } catch (error) {
            console.error(`MongoDB connection failed: ${error.message}. Retrying in ${delay / 1000}s...`)
            await new Promise(resolve => setTimeout(resolve, delay))
            delay = Math.min(delay * 2, MAX_RETRY_DELAY_MS)
            continue
        }
        if (onFirstConnect) {
            try {
                await onFirstConnect()
            } catch (error) {
                console.error("Connected to MongoDB, but the post-connect test query failed:", error.message)
            }
        }
        return
    }
}

loadParameters().then(async () => {
    let { DB_URI } = await import("./initDB.js")
    // console.log(DB_URI)
    //Set public image expiration time
    if (!process.env.PUBLIC_IMG_EXP) {
        process.env.PUBLIC_IMG_EXP = 5
    }
    console.log(`Public image expiration time set to ${process.env.PUBLIC_IMG_EXP} hours`)
    let { signUrl, buildSignedUrlsObj } = await import("./managerS3.js")
    let { testDbConnection } = await import("./testDb.js")
    let { verifyBooking, confirmBooking } = await import("./bookingVerification.js")
    let { sendVerificationEmail, sendManagerNotificationEmail, sendSpaVerificationEmail, sendSpaManagerNotificationEmail } = await import("./functions/email.js")
    let { buildRoomsArray, buildRoomById } = await import("./db/rooms.js")
    let { getSpaServices, getSpaAvailability, verifySpaBooking, confirmSpaBooking } = await import("./spa/spaBooking.js")

    startservice()

    connectWRetry(DB_URI, testDbConnection)

    async function startservice() {
        //Import authentication modules here
        // e.g import { authenticateToken } from './auth.js';


        const app = express();
        const server = createServer(app);
        const upload = multer()

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json());
        app.use(setBuild)


        app.get('/api', (req, res) => {
            res.json({ "message": "/api endpoint", "status": "true" })
        });

        app.get('/api/health', (req, res) => {
            const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
            const dbState = states[connection.readyState] || 'unknown'
            const healthy = connection.readyState === 1
            res.status(healthy ? 200 : 503).json({ status: healthy ? 'ok' : 'degraded', db: dbState })
        });

        app.get('/api/test', (req, res) => {
            res.json({ "message": "Test endpoint", "status": "true", "test": process.env.TEST || 'NOT_FOUND' });
        });

        app.get('/api/rez541/v1/signurl', signUrl)

        app.get('/api/rez541/v1.1/signurl', signUrl)

        app.post('/api/rez541/v1.1/signurls', upload.none(), buildSignedUrlsObj, sendBuild)

        app.post('/api/rez541/v1.1/verifybooking', upload.none(), verifyBooking, sendVerificationEmail)

        app.post('/api/rez541/v1.1/confirmbooking', confirmBooking, sendManagerNotificationEmail, sendBuild)

        app.get('/api/rez541/v1.1/getrooms', buildRoomsArray, sendBuild);

        app.get('/api/rez541/v1.1/getroombyid/id/:id', buildRoomById, sendBuild);

        app.get('/api/rez541/v1.1/spa/services', getSpaServices, sendBuild)

        app.get('/api/rez541/v1.1/spa/availability', getSpaAvailability, sendBuild)

        app.post('/api/rez541/v1.1/spa/verifybooking', upload.none(), verifySpaBooking, sendSpaVerificationEmail)

        app.post('/api/rez541/v1.1/spa/confirmbooking', confirmSpaBooking, sendSpaManagerNotificationEmail, sendBuild)

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        })

        const PORT = process.env.PORT || 4000;

        server.listen(PORT, () => {
            console.log(`API server is running on port ${PORT}`);
        });
    }
}).catch((error) => {
    console.error("Fatal error during startup:", error);
    process.exit(1);
})
