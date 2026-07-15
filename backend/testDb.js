import { SignedUrl } from "./models/signedurl.js";
import logger from "./logger.js"

const testImageUri = "public/2-bedroom-suite/bedroom-gf.jpg";

export const testDbConnection = async () => {
    const result = await SignedUrl.findByImageUri(`${testImageUri}`);
    logger.debug({ imageUri: testImageUri, found: result.length > 0 }, 'Post-connect test query completed');
    logger.info("Database connection successful");
}
