const confirmationMessage = 'Spa booking confirmed successfully'

export const load = async ({ url }) => {
    const bookingToken = url.searchParams.get('token') || null;
    try {
        const response = await fetch(`http://backend:4000/api/rez541/v1.1/spa/confirmbooking`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingToken }),
            }
        );
        const jsonData = await response.json();
        if (!response.ok) {
            throw new Error(jsonData.message || 'Failed to confirm spa booking');
        }
        return {
            bookingData: {
                success: true,
                message: jsonData.bookingMessage || jsonData.message || confirmationMessage
            }
        };
    } catch (error) {
        return {
            bookingData: {
                success: false,
                message: error.message
            }
        }
    }
}
