export function preloadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });
}

export function preloadImages(srcs = []) {
    return Promise.all(srcs.filter(Boolean).map(preloadImage));
}
