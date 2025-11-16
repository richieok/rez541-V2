export const actions = {
    startBooking: async ({ request }) => {
        try {
            const formData = await request.formData();
            const firstname = formData.get('firstname');
            const lastname = formData.get('lastname');
            const email = formData.get('email');
            const checkIn = formData.get('check-in');
            const checkOut = formData.get('check-out');
            console.log({ firstname, lastname, email, checkIn, checkOut });
            const newBooking = { firstname, lastname, email, checkIn, checkOut };
            const res = await fetch('http://backend:4000/api/rez541/v1/verifybooking', {
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
        } catch (error) {
            return {
                success: false, error: error.message
            }
        }
        return { success: true, message: 'Booking initiated successfully. Please check your email to verify your booking.'}
    }
}
