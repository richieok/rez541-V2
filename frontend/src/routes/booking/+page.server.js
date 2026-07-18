import { getRooms } from "$lib/server/api.js"
import logger from "$lib/server/logger.js"

function formatDateWithTime(dateString, hour) {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
}

export const actions = {
    default: async ({ request, fetch }) => {
        let message = "Nothing done"
        try {
            const formData = await request.formData();
            const roomId = formData.get('roomType')
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const checkIn = formatDateWithTime(formData.get('check-in'), 13);
            const checkOut = formatDateWithTime(formData.get('check-out'), 12);
            const bookingObj = { roomId, firstName, lastName, email, phone, checkIn, checkOut };
            const res = await fetch('http://backend:4000/api/rez541/v1.1/verifybooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookingObj })
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to start booking.');
            }
            logger.info({ roomId }, 'Booking verification initiated');
            message = "Booking initiated successfully. Please check your email to verify your booking."
        } catch (error) {
            logger.error({ err: error }, 'Booking action failed');
            return {
                success: false, error: error.message
            }
        }
        return { success: true, message }
    }
}

export async function load({url}) {
    const roomId = url.searchParams.get('roomId');
    let rooms = await getRooms()
    logger.debug({ roomId: roomId || null }, 'Booking page loaded');
    return { "rooms": rooms, "roomId": roomId };
}