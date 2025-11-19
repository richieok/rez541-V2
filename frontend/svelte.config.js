import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: true,
			trustedOrigins: [
				"www.residence541.com",
				"residence541.com",
				// "localhost:5173",
				// "127.0.0.1:5173"
			]
		}
		
	}
};