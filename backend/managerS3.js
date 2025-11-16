import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SignedUrl } from "./models/signedurl.js";
import { DB_URI } from "./initDB.js";
import { connect, disconnect } from "mongoose";

let options = {
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const fsignUrl = async ({ client, bucket, key }) => {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 18000 }); // 5 hours
}

const client = new S3Client(options);

export const signUrl = async (req, res) => {
    try {
        const { folder, filename } = req.params
        const key = `${folder}/${filename}`
        console.log(key)
        await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const result = await SignedUrl.findByImageUri(key)
        if (result && result.length > 0) {
            console.log("Found existing signed URL in database.");
            console.log(result[0].signedUrl);
            if (result[0].expiresAt > new Date()) {
                // Signed URL is still valid
                await disconnect();
                res.send(result[0].signedUrl);
            } else {
                console.log("Existing signed URL has expired. Generating new signed URL.");
                const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                result[0].signedUrl = surl;
                result[0].expiresAt = new Date(Date.now() + 3600 * 5000);
                await result[0].save();
                await disconnect();
                res.send(surl);
            }
        } else {
            console.log("No existing signed URL found in database. Generating new signed URL.");
            const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
            const surlObj = new SignedUrl({
                imageUri: key,
                imagePath: key,
                signedUrl: surl,
                expiresAt: new Date(Date.now() + 3600 * 5000), // 5 hours from now
            });
            await surlObj.save();
            await disconnect();
            res.send(surl);
        }

    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ "message": "Error signing URL", "error": error.message })
    }
}

// Sign multiple URLs
export const signUrls = async (req, res) => {
    let { uris } = req.body
    let signedUrls = new Map()
    try {
        await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        for (let i = 0; i < uris.length; i++) {
            const key = uris[i]
            console.log(key)
            const result = await SignedUrl.findByImageUri(key)
            if (result && result.length > 0) {
                console.log("Found existing signed URL in database.");
                console.log(result[0].signedUrl);
                if (result[0].expiresAt > new Date()) {
                    // Signed URL is still valid
                    signedUrls.set(key, result[0].signedUrl);
                    // signedUrls.push(result[0].signedUrl)
                } else {
                    console.log("Existing signed URL has expired. Generating new signed URL.");
                    const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                    result[0].signedUrl = surl;
                    result[0].expiresAt = new Date(Date.now() + 3600 * 5000);
                    await result[0].save();
                    signedUrls.set(key, surl);
                    // signedUrls.push(result[0].signedUrl)
                }
            } else {
                console.log("No existing signed URL found in database. Generating new signed URL.");
                const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                const surlObj = new SignedUrl({
                    imageUri: key,
                    imagePath: key,
                    signedUrl: surl,
                    expiresAt: new Date(Date.now() + 3600 * 5000), // 5 hours from now
                });
                await surlObj.save();
                signedUrls.set(key, surl);
                // signedUrls.push(surl)
            }

        }
        res.json({ "signedUrls": Object.fromEntries(signedUrls) })

    } catch (error) {
        res.status(500).json({ "message": "Error signing URLs", "error": error.message })
    }
}