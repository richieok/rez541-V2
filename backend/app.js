import express from 'express';
import { connect } from "mongoose"
import { createServer } from 'node:http'
import multer from 'multer'
import { loadParameters } from "./cloud.js"
import { sendBuild, setBuild } from "./db/build.js"

loadParameters().then(async () => {
    let { DB_URI } = await import("./initDB.js")
    // console.log(DB_URI)
    await connect(DB_URI)
    //Set public image expiration time
    if (!process.env.PUBLIC_IMG_EXP) {
        process.env.PUBLIC_IMG_EXP = 5
    }
    console.log(`Public image expiration time set to ${process.env.PUBLIC_IMG_EXP} hours`)
    let { signUrl, buildSignedUrlsObj } = await import("./managerS3.js")
    let { testDbConnection } = await import("./testDb.js")
    let { verifyBooking, confirmBooking } = await import("./bookingVerification.js")
    let { sendVerificationEmail } = await import("./functions/email.js")
    let { buildRoomsArray, buildRoomById } = await import("./db/rooms.js")
    await testDbConnection()

    startservice()

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

        app.get('/api/test', (req, res) => {
            res.json({ "message": "Test endpoint", "status": "true", "test": process.env.TEST || 'NOT_FOUND' });
        });

        app.get('/api/rez541/v1/signurl', signUrl)

        app.get('/api/rez541/v1.1/signurl', signUrl)

        app.post('/api/rez541/v1.1/signurls', upload.none(), buildSignedUrlsObj, sendBuild)

        app.post('/api/rez541/v1.1/verifybooking', upload.none(), verifyBooking, sendVerificationEmail)

        app.post('/api/rez541/v1.1/confirmbooking', confirmBooking)

        app.get('/api/rez541/v1.1/getrooms', buildRoomsArray, sendBuild);

        app.get('/api/rez541/v1.1/getroombyid/id/:id', buildRoomById, sendBuild);

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        })

        const PORT = process.env.PORT || 4000;

        server.listen(PORT, () => {
            console.log(`API server is running on port ${PORT}`);
        });
    }
})
