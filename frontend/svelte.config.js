import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: true,
			allowedOrigins: [
				'residence541.com',
				'www.residence541.com',
				'localhost:5173',
				'127.0.0.1:5173'
			]
		}
	}
};