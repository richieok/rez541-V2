const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

if (!username) {
    throw new Error("DB_USERNAME environment variable is not set — cannot build MongoDB connection string")
}
if (!password) {
    throw new Error("DB_PASSWORD environment variable is not set — cannot build MongoDB connection string")
}

export const DB_URI = `mongodb+srv://${username}:${password}@cluster0.z8ae8.mongodb.net/rez541db?retryWrites=true&w=majority`;
