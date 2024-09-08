import { Pool, PoolClient } from '@neondatabase/serverless';
import { WisdomItem } from '../../../shared/types';
import { Env } from '../types';

export async function handleWisdom(env: Env, request: Request): Promise<Response> {
	const pool = new Pool({ connectionString: env.DATABASE_URL });
	let client: PoolClient | null = null;

	console.log('handleWisdom');

	try {
		const url = new URL(request.url);
		const categories = url.searchParams.get('categories');
		const categoryIds = categories ? categories.split(',').map(Number) : [];

		client = await pool.connect();
		let query = `
			SELECT 
				w.*,
				COALESCE(
					json_agg(
						json_build_object(
							'category_id', c.category_id,
							'name', c.name,
							'description', c.description
						)
					) FILTER (WHERE c.category_id IS NOT NULL),
					'[]'
				) as categories
			FROM wisdom w
			LEFT JOIN wisdom_categories wc ON w.wisdom_id = wc.wisdom_id
			LEFT JOIN categories c ON wc.category_id = c.category_id
		`;

		if (categoryIds.length > 0) {
			query += `
				WHERE w.wisdom_id IN (
					SELECT wc.wisdom_id
					FROM wisdom_categories wc
					WHERE wc.category_id = ANY($1::int[])
					GROUP BY wc.wisdom_id
					HAVING array_agg(wc.category_id) @> $1::int[]
				)
			`;
		}

		query += `
			GROUP BY w.wisdom_id
			ORDER BY w.created_at DESC
			LIMIT 100
		`;

		const { rows } = categoryIds.length > 0
			? await client.query<WisdomItem>(query, [categoryIds])
			: await client.query<WisdomItem>(query);

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