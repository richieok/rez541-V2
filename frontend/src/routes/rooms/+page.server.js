async function getPublicUrl(file) {
    let res = await fetch(`http://backend:4000/api/rez541/v1/sign/folder/public/filename/${file}`)
    if (!res.ok){
        console.log("error: ", res.status)
        return null
    }
    let result = await res.text();
    return result
}

export async function load() {
    const resp = await getPublicUrl("joseph-bobadilla-i3DxNe0ktZI-unsplash.jpg")
    // const ans = await resp.json()
    // console.log(ans);
    
    return {name: "james"}
}