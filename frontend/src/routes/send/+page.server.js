export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        console.log(data);

        return {
            success: true
        }
    }
}