import logger from '$lib/server/logger.js';

const confirmationMessage = 'Booking confirmed successfully'

export const load = async ({ url, fetch }) => {
    const bookingToken = url.searchParams.get('token') || null;
    try {
        const response = await fetch(`http://backend:4000/api/rez541/v1.1/confirmbooking`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingToken }),
            }
        );
        if (!response.ok) {
            throw new Error('Failed to confirm booking');
        }
        const jsonData = await response.json();
        return {
            bookingData: {
                success: true,
                message: jsonData.message || confirmationMessage
            }
        };
    } catch (error) {
        logger.error({ err: error }, 'Booking confirmation failed');
        return {
            bookingData: {
                success: false,
                message: error.message
            }
        }
    }
}