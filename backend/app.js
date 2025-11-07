import { parametersLoaded } from "./cloud.js"

await parametersLoaded

import express from 'express';
import { createServer } from 'node:http'
import multer from 'multer'

import { signUrl } from "./managerS3.js"
import { testDbConnection } from "./testDb.js"

console.log(process.envDB_PASSWORD)

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


    app.get('/api', (req, res) => {
        res.json({ "message": "/api endpoint", "status": "true" })
    });

    app.get('/api/test', (req, res) => {
        res.json({ "message": "Test endpoint", "status": "true", "test": process.env.TEST || 'NOT_FOUND' });
    });

    // app.get('/api/rez541/v1/sign/folder/:folder/filename/:filename', (req, res)=>{
    //     const { folder, filename } = req.params
    //     console.log(`folder: ${folder}\nfilename: ${filename}`)
    //     res.json({ "message": "publicSignUrl endpoint", "status": "true" })
    // })
    // app.get('/api/rez541/v1/sign/folder/:folder/filename/:filename', signUrl)

    app.get('/api/rez541/v1/sign/folder/:folder/filename/:filename', signUrl)

    app.post('api/rez541/v1/signurls', upload.none(), (req, res) => {
        res.json({ "message": "POST signurls endpoint", "status": "true" })
    })

    const PORT = process.env.PORT || 4000;

    server.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}`);
    });
}