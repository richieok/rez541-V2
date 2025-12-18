export async function getRooms() {
    let res = await fetch(`http://backend:4000/api/rez541/v1/getrooms`)
    if (!res.ok){
        console.log("error: ", res.status)
        return []
    }
    const rooms = await res.json()
    //sign urls 
    return rooms
}