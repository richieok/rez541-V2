const STORAGE_KEY = "rez541:signedUrlCache";
// Stop using a cached URL a little before it truly expires, so we don't hand
// out a signature that dies mid-request.
const EXPIRY_BUFFER_MS = 60_000;

function readCache() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
    } catch {
        return {};
    }
}

function writeCache(cache) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
    } catch {
        // Storage full or unavailable (e.g. private browsing) - caching is
        // best-effort, so just skip it.
    }
}

// S3 presigned URLs carry their own signing time and TTL in the query
// string, so we can read the real expiry back out instead of guessing one.
function getSignedUrlExpiry(url) {
    try {
        const { searchParams } = new URL(url);
        const amzDate = searchParams.get("X-Amz-Date");
        const expiresInSeconds = Number(searchParams.get("X-Amz-Expires"));
        if (!amzDate || !expiresInSeconds) return null;

        const iso = amzDate.replace(
            /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/,
            "$1-$2-$3T$4:$5:$6Z",
        );
        const signedAt = Date.parse(iso);
        if (Number.isNaN(signedAt)) return null;

        return signedAt + expiresInSeconds * 1000;
    } catch {
        return null;
    }
}

// Splits `uris` into ones we already have a still-valid cached URL for, and
// ones that still need to be fetched/signed.
export function getCachedSignedUrls(uris = []) {
    const cache = readCache();
    const now = Date.now();
    const cached = {};
    const missing = [];

    for (const uri of uris) {
        const entry = cache[uri];
        if (entry && entry.expiresAt - EXPIRY_BUFFER_MS > now) {
            cached[uri] = entry.url;
        } else {
            missing.push(uri);
        }
    }

    return { cached, missing };
}

// Stores newly-fetched `{ uri: signedUrl }` pairs, keyed by their own
// parsed expiry so future lookups know when to drop them.
export function cacheSignedUrls(signedUrlObj = {}) {
    const cache = readCache();

    for (const [uri, url] of Object.entries(signedUrlObj)) {
        const expiresAt = getSignedUrlExpiry(url);
        if (expiresAt) {
            cache[uri] = { url, expiresAt };
        }
    }

    writeCache(cache);
}
