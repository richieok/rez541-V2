import {connect, disconnect} from "mongoose";
import { DB_URI } from "./initDB.js";
import { SignedUrl } from "./models/signedurl.js";

const testImageUri = "vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg";

const signedLink = "https://rez541bucket.s3.us-east-1.amazonaws.com/public/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ODU37O5HLQW75HY%2F20251106%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251106T123859Z&X-Amz-Expires=3600&X-Amz-Signature=975a105cc00ba921d73b56bc1f236fadfd019bff9d885286b2c2beb2735e3025&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"

export const testDbConnection = async () => {
    try {
        console.log("Database URI:", DB_URI);
        await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        // const surl = new SignedUrl({
        //     imageUri: `public/${testImageUri}`,
        //     imagePath: `public/${testImageUri}`,
        //     signedUrl: signedLink,
        //     expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
        // });
        // await surl.save();
        // console.log("Test signed URL document saved.");
        const result = await SignedUrl.findByImageUri(`public/${testImageUri}`);
        console.log(`Test query result for imageUri 'public/${testImageUri}':`, result);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection error:", error);
    } finally {
        await disconnect();
    }
}
