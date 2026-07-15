import logger from '$lib/server/logger.js';

export async function handle({ event, resolve }) {
    const start = Date.now();
    const requestId = event.request.headers.get('x-request-id') || crypto.randomUUID();
    event.locals.requestId = requestId;

    const response = await resolve(event);

    logger.info({
        requestId,
        method: event.request.method,
        route: event.route.id,
        path: event.url.pathname,
        status: response.status,
        durationMs: Date.now() - start
    }, 'Request handled');

    return response;
}

// Propagates the request id to backend calls made with the load/action `fetch`
export async function handleFetch({ event, request, fetch }) {
    if (event.locals.requestId) {
        request.headers.set('x-request-id', event.locals.requestId);
    }
    return fetch(request);
}

export function handleError({ error, event, status, message }) {
    logger.error({
        err: error,
        requestId: event.locals?.requestId,
        route: event.route?.id,
        path: event.url?.pathname,
        status
    }, 'Unhandled server error');
    return { message: 'Internal Error' };
}
