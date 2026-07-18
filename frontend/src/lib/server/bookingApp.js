export async function getRooms() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/getrooms`)
    if (!res.ok){
        throw new Error(`Failed to fetch rooms: ${res.status}`)
    }
    const { roomsArray } = await res.json()
    return roomsArray
}

export async function getHeroImage() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/home/hero`)
    if (!res.ok){
        throw new Error(`Failed to fetch hero image: ${res.status}`)
    }
    const { heroImage } = await res.json()
    return heroImage
}
