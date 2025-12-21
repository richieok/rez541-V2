import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SignedUrl } from "./models/signedurl.js";

let options = {
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const fsignUrl = async ({ client, bucket, key }) => {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(client, command, { expiresIn: 3600 * process.env.PUBLIC_IMG_EXP });
}

const client = new S3Client(options);

export const signUrl = async (req, res) => {
    try {
        const uriString = req.query.path;
        if (!uriString) {
            return res.status(400).json({ "message": "Missing path query parameter" });
        }
        const key = decodeURIComponent(uriString);

        // await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const result = await SignedUrl.findByImageUri(key)
        if (result && result.length > 0) {
            console.log("Found existing signed URL in database.");
            console.log(result[0].signedUrl);
            if (result[0].expiresAt > new Date()) {
                // Signed URL is still valid
                res.send(result[0].signedUrl);
            } else {
                console.log("Existing signed URL has expired. Generating new signed URL.");
                const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                result[0].signedUrl = surl;
                result[0].expiresAt = new Date(Date.now() + 3600 * 5000);
                await result[0].save();
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
            res.send({ surl });
        }

    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({ "message": "Error signing URL", "error": error.message })
    }
}

export const retrieveSignedUrls = async (uris) => {
    if (uris.length === 0) {
        return {}
    }
    let signedUrls = new Map()
    for (let i = 0; i < uris.length; i++) {
        const key = uris[i]
        // console.log(key)
        const result = await SignedUrl.findByImageUri(key)
        if (result && result.length > 0) {
            console.log("Found existing signed URL in database.");
            // console.log(result[0].signedUrl);
            if (result[0].expiresAt > new Date()) {
                // Signed URL is still valid
                signedUrls.set(key, result[0].signedUrl);
                // signedUrls.push(result[0].signedUrl)
            } else {
                console.log("Existing signed URL has expired. Generating new signed URL.");
                const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                result[0].expiresAt = new Date(Date.now() + (3600000 * process.env.PUBLIC_IMG_EXP - 1000));
                result[0].signedUrl = surl;
                await result[0].save();
                signedUrls.set(key, surl);
            }
        } else {
            console.log("No existing signed URL found in database. Generating new signed URL.");
            const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
            const surlObj = new SignedUrl({
                imageUri: key,
                imagePath: key,
                signedUrl: surl,
                expiresAt: new Date(Date.now() + (3600000 * process.env.PUBLIC_IMG_EXP - 1000)),
            });
            await surlObj.save();
            signedUrls.set(key, surl);
        }

    }
    return Object.fromEntries(signedUrls)
}

export const buildSignedUrlsObj = async (req, res, next) => {
    req.build.signedUrls = {}
    let { uris } = req.body
    if (uris.length === 0) {
        next()
    }
    let signedUrls = new Map()
    try {
        for (let i = 0; i < uris.length; i++) {
            const key = uris[i]
            // console.log(key)
            const result = await SignedUrl.findByImageUri(key)
            if (result && result.length > 0) {
                console.log("Found existing signed URL in database.");
                // console.log(result[0].signedUrl);
                if (result[0].expiresAt > new Date()) {
                    // Signed URL is still valid
                    signedUrls.set(key, result[0].signedUrl);
                    // signedUrls.push(result[0].signedUrl)
                } else {
                    console.log("Existing signed URL has expired. Generating new signed URL.");
                    const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                    result[0].expiresAt = new Date(Date.now() + (3600000 * process.env.PUBLIC_IMG_EXP - 1000));
                    result[0].signedUrl = surl;
                    await result[0].save();
                    signedUrls.set(key, surl);
                }
            } else {
                console.log("No existing signed URL found in database. Generating new signed URL.");
                const surl = await fsignUrl({ client, bucket: process.env.AWS_BUCKET, key });
                const surlObj = new SignedUrl({
                    imageUri: key,
                    imagePath: key,
                    signedUrl: surl,
                    expiresAt: new Date(Date.now() + (3600000 * process.env.PUBLIC_IMG_EXP - 1000)),
                });
                await surlObj.save();
                signedUrls.set(key, surl);
            }

        }
        req.build.signedUrls = Object.fromEntries(signedUrls)
        next()
    } catch (error) {
        next(error)
    }
}