import { getRooms } from "$lib/server/bookingApp.js"

export const actions = {
    default: async ({ request }) => {
        // console.log('Origin:', request.headers.get('origin'));
        // console.log('Host:', request.headers.get('host'));
        let message = "Nothing done"
        try {
            const formData = await request.formData();
            const roomId = formData.get('roomType')
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const checkIn = formData.get('check-in');
            const checkOut = formData.get('check-out');
            const newBooking = { roomId, firstName, lastName, email, phone, checkIn, checkOut };
            console.log(newBooking);
            const res = await fetch('http://backend:4000/api/rez541/v1.1/verifybooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newBooking })
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to start booking.');
            }
            console.log('Booking response:', data);
            message = "Booking initiated successfully. Please check your email to verify your booking."
        } catch (error) {
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
    roomId ? console.log("Room ID:", roomId) : console.log("No Room ID provided");
    return { "rooms": rooms, "roomId": roomId };
}