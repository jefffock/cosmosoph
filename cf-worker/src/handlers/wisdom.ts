import { Pool, PoolClient } from '@neondatabase/serverless';
import { WisdomRow } from '../../../shared/types';
import { Env } from '../types';

export async function handleWisdom(env: Env): Promise<Response> {
	const pool = new Pool({ connectionString: env.DATABASE_URL });
	let client: PoolClient | null = null;

	console.log('handleWisdom');

	try {
		client = await pool.connect();
		const { rows } = await client.query<WisdomRow>('SELECT * FROM wisdom ORDER BY created_at DESC LIMIT 100');

		return new Response(JSON.stringify(rows), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in handleWisdom:', error);
		return new Response(JSON.stringify({ error: 'Database Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		if (client) await client.release();
		await pool.end();
	}
}