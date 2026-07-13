// DB_URI env var takes precedence so local/test stacks (e.g. compose.fakedb.yml)
// can point the backend at a throwaway MongoDB instead of the Atlas cluster.
const buildDbUri = () => {
    if (process.env.DB_URI) {
        return process.env.DB_URI
    }

    const username = process.env.DB_USERNAME
    const password = process.env.DB_PASSWORD

    if (!username) {
        throw new Error("DB_USERNAME environment variable is not set — cannot build MongoDB connection string")
    }
    if (!password) {
        throw new Error("DB_PASSWORD environment variable is not set — cannot build MongoDB connection string")
    }

    return `mongodb+srv://${username}:${password}@cluster0.z8ae8.mongodb.net/rez541db?retryWrites=true&w=majority`
}

export const DB_URI = buildDbUri();
