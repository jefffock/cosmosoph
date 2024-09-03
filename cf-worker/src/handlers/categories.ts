import { Pool, PoolClient } from "@neondatabase/serverless";
import { Category } from "../../../shared/types";
import { Env } from "../types";

export async function handleCategories(env: Env): Promise<Response> {
	const pool = new Pool({ connectionString: env.DATABASE_URL });
	let client: PoolClient | null = null;

	try {
		client = await pool.connect();
		const categories = await client.query<Category>(`
			SELECT 
				"category_id",
				"name",
				"description"
			FROM "categories"
			ORDER BY "name"
		`);

		return new Response(JSON.stringify(categories), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error in handleCategories:', error);
		return new Response(JSON.stringify({ error: 'Database Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		if (client) client.release();
		await pool.end();
	}
}

export async function handleCategoriesHierarchy(env: Env): Promise<Response> {
    const pool = new Pool({ connectionString: env.DATABASE_URL });
    let client: PoolClient | null = null;

    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT 
                c."category_id",
                c."name",
                c."description",
                cr."parent_category_id"
            FROM "categories" c
            LEFT JOIN "category_relationships" cr ON c."category_id" = cr."child_category_id"
            ORDER BY c."name"
        `);

        const categoriesMap: Map<number, Category> = new Map();

        // First pass: create all category objects
        result.rows.forEach(row => {
            if (!categoriesMap.has(row.category_id)) {
                categoriesMap.set(row.category_id, {
                    category_id: row.category_id,
                    name: row.name,
                    description: row.description,
                    children: []
                });
            }
        });

        // Second pass: build the hierarchy
        result.rows.forEach(row => {
            const category = categoriesMap.get(row.category_id)!;
            if (row.parent_category_id) {
                const parentCategory = categoriesMap.get(row.parent_category_id);
                if (parentCategory) {
                    parentCategory.children.push(category);
                }
            }
        });

        // Get only root categories (those without parents)
        const rootCategories = Array.from(categoriesMap.values()).filter(category => 
            !result.rows.some(row => row.child_category_id === category.category_id)
        );

        return new Response(JSON.stringify(rootCategories), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in handleCategories:', error);
        return new Response(JSON.stringify({ error: 'Database Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        if (client) client.release();
        await pool.end();
    }
}