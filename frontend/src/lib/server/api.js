async function getJson(path, label) {
    const res = await fetch(`http://backend:4000/api/rez541/v1.1${path}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch ${label}: ${res.status}`)
    }
    return res.json()
}

export async function getRooms() {
    const { roomsArray } = await getJson('/getrooms', 'rooms')
    return roomsArray
}

export async function getHomeImages() {
    return getJson('/home/images', 'home images')
}

export async function getSpaImages() {
    return getJson('/spa/images', 'spa images')
}

export async function getServiceMenuImages() {
    return getJson('/spa/service-menu/images', 'service menu images')
}
