import { retrieveSignedUrls } from "$lib/server/signing.js"
import { getRooms } from "$lib/server/bookingApp.js"

// async function getRooms() {
//     let res = await fetch(`http://backend:4000/api/rez541/v1/getrooms`)
//     if (!res.ok){
//         console.log("error: ", res.status)
//         return []
//     }
//     const rooms = await res.json()
//     //sign urls 
//     return rooms
// }

export async function load() {
    let rooms = await getRooms()
    console.log("Rooms count:", rooms.length)
    // for (let room of rooms) {
    //     const signedUrls = await retrieveSignedUrls(room.imageList)
    //     // console.log(signedUrls)
    //     room.signedUrls = signedUrls
    // }
    // const ans = await resp.json()
    // console.log(ans);
    
    return {"rooms": rooms}
}