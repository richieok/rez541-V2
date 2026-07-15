export async function getRooms() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/getrooms`)
    if (!res.ok){
        throw new Error(`Failed to fetch rooms: ${res.status}`)
    }
    const { roomsArray } = await res.json()
    return roomsArray
}