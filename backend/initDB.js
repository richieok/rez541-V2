const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

// console.log(`${username} ${password}`)

export const DB_URI = `mongodb+srv://${username}:${password}@cluster0.z8ae8.mongodb.net/rez541db?retryWrites=true&w=majority`;
