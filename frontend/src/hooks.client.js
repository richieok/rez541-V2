export function handleError({ error, status, message }) {
    console.error('Unhandled client error:', status, message, error);
    return { message: 'Something went wrong' };
}
