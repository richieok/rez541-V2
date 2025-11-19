import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter({
			protocol_header: 'x-forwarded-proto',
			host_header: 'x-forwarded-host'
		})

	}
};