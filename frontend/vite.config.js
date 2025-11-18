import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// allowedHosts: [
		// 	'residence541.com',
		// 	'www.residence541.com',
		// 	'localhost:5173',
		// 	'127.0.0.1:5173'
		// ],
		// cors
	}
});
