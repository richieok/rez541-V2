export async function sendBuild(req, res) {
    res.json(req.build)
}

export async function setBuild(req, res, next) {
    if (!req.build) {
        req.build = {}
    }
    next()
}