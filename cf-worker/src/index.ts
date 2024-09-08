import { addCorsHeaders } from './utils';
import { handleCategories, handleCategoriesHierarchyCTE } from './handlers/categories';
import { handleWisdom } from './handlers/wisdom';
import { Env } from './types';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return addCorsHeaders(new Response(null, { status: 204 }));
		}

		try {
			const url = new URL(request.url);
			console.log(`Received request for: ${url.pathname}`);

			let response: Response;

			switch (url.pathname) {
				case '/api/categories':
					console.log('Handling /api/categories route');
					// response = await handleCategories(env);
					response = await handleCategoriesHierarchyCTE(env)
					break;
				case '/api/wisdom':
					console.log('Handling /api/wisdom route');
					response = await handleWisdom(env, request);
					break;
				case '/':
					response = new Response('Welcome to my Neon API. Try accessing /api/users, /api/categories, or /api/wisdom', {
						headers: { 'Content-Type': 'text/plain' },
					});
					break;
				default:
					console.log(`No handler for route: ${url.pathname}`);
					response = new Response(`Not Found: ${url.pathname}`, { status: 404 });
			}

			return addCorsHeaders(response);
		} catch (error) {
			console.error('Unhandled error:', error);
			return addCorsHeaders(new Response('Internal Server Error', { status: 500 }));
		}
	},
};