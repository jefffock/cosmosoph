export async function fetchFromWorker<T>(endpoint: string): Promise<T> {
	const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;
	if (!workerUrl) {
		throw new Error('Worker URL is not defined in environment variables');
	}

	const apiEndpoint = `/api/${endpoint}`;
	console.log(`Fetching data from: ${workerUrl}${apiEndpoint}`);
	const response = await fetch(`${workerUrl}${apiEndpoint}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}
	return response.json() as Promise<T>;
}