// lib/api.ts
export async function fetchFromWorker<T>(endpoint: string): Promise<T> {
	const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
	if (!workerUrl) {
		throw new Error('Worker URL is not defined in environment variables');
	}

	console.log('fetching data from worker:>>', workerUrl + endpoint);
	const response = await fetch(`${workerUrl}${endpoint}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}
	return response.json() as Promise<T>;
}