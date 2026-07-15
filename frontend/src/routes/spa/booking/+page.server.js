import logger from '$lib/server/logger.js';

export async function load({ url, fetch }) {
    const serviceId = url.searchParams.get('serviceId');
    const date = url.searchParams.get('date');

    let services = [];
    try {
        const res = await fetch('http://backend:4000/api/rez541/v1.1/spa/services');
        if (res.ok) {
            ({ spaServices: services } = await res.json());
        }
    } catch (error) {
        logger.error({ err: error }, 'Failed to fetch spa services');
    }

    let availability = null;
    if (serviceId && date) {
        try {
            const res = await fetch(`http://backend:4000/api/rez541/v1.1/spa/availability?serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}`);
            if (res.ok) {
                ({ availability } = await res.json());
            }
        } catch (error) {
            logger.error({ err: error }, 'Failed to fetch spa availability');
        }
    }

    return { services, availability, serviceId, date };
}

export const actions = {
    default: async ({ request, fetch }) => {
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
            logger.error({ err: error }, 'Spa booking action failed');
            return { success: false, error: error.message };
        }
    }
};
