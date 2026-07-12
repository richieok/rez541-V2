export async function load({ url }) {
    const serviceId = url.searchParams.get('serviceId');
    const date = url.searchParams.get('date');

    let services = [];
    try {
        const res = await fetch('http://backend:4000/api/rez541/v1.1/spa/services');
        if (res.ok) {
            ({ spaServices: services } = await res.json());
        }
    } catch (error) {
        console.error('Failed to fetch spa services:', error.message);
    }

    let availability = null;
    if (serviceId && date) {
        try {
            const res = await fetch(`http://backend:4000/api/rez541/v1.1/spa/availability?serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}`);
            if (res.ok) {
                ({ availability } = await res.json());
            }
        } catch (error) {
            console.error('Failed to fetch spa availability:', error.message);
        }
    }

    return { services, availability, serviceId, date };
}

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const bookingObj = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                serviceId: formData.get('serviceId'),
                startsAt: formData.get('startsAt'),
            };
            const res = await fetch('http://backend:4000/api/rez541/v1.1/spa/verifybooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bookingObj })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to book appointment.');
            }
            return {
                success: true,
                message: 'Appointment requested. Please check your email to confirm your booking.'
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};
