export async function getRooms() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/getrooms`)
    if (!res.ok){
        throw new Error(`Failed to fetch rooms: ${res.status}`)
    }
    const { roomsArray } = await res.json()
    return roomsArray
}

export async function getHomeImages() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/home/images`)
    if (!res.ok){
        throw new Error(`Failed to fetch home images: ${res.status}`)
    }
    const { heroImage, collageImages } = await res.json()
    return { heroImage, collageImages }
}

export async function getSpaImages() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/spa/images`)
    if (!res.ok){
        throw new Error(`Failed to fetch spa images: ${res.status}`)
    }
    const { heroImage, lotusImage, galleryImages } = await res.json()
    return { heroImage, lotusImage, galleryImages }
}

export async function getServiceMenuImages() {
    let res = await fetch(`http://backend:4000/api/rez541/v1.1/spa/service-menu/images`)
    if (!res.ok){
        throw new Error(`Failed to fetch service menu images: ${res.status}`)
    }
    const { heroImage, lotusImage } = await res.json()
    return { heroImage, lotusImage }
}
