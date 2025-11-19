export async function handle({event, resolve}) {
    console.log('Origin header:', event.request.headers.get('origin'))
    console.log('Expected origin:', event.url.origin)
    return resolve(event)
}