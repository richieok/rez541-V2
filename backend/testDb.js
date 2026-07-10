import { SignedUrl } from "./models/signedurl.js";

const testImageUri = "public/2-bedroom-suite/bedroom-gf.jpg";

export const testDbConnection = async () => {
    const result = await SignedUrl.findByImageUri(`${testImageUri}`);
    console.log(`Test query result for imageUri '${testImageUri}':`, result);
    console.log("Database connection successful");
}
