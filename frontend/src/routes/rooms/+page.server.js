import { retrieveSignedUrls } from "$lib/server/signing.js"
import { getRooms } from "$lib/server/bookingApp.js"

export async function load() {
    let rooms = await getRooms()
    return { "rooms": rooms }
}