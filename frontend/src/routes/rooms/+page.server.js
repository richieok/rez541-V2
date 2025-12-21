import { retrieveSignedUrls } from "$lib/server/signing.js"
import { getRooms } from "$lib/server/bookingApp.js"

export async function load() {
    let rooms = await getRooms()
    // console.log("Rooms count:", rooms.length)
    // for (let room of rooms) {
    //     const res = await retrieveSignedUrls(room.imageList)
    //     const { signedUrls } = await res.json()
    //     console.log("signedUrls ->", signedUrls)
    //     room.signedUrls = signedUrls
    // }
    // const ans = await resp.json()
    // console.log(ans);

    return { "rooms": rooms }
}