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

export async function handleCategoriesHierarchyCTE(env: Env): Promise<Response> {
    const pool = new Pool({ connectionString: env.DATABASE_URL });
    let client: PoolClient | null = null;

    try {
        client = await pool.connect();
        const result = await client.query(`
            WITH RECURSIVE category_tree AS (
                SELECT 
                    c."category_id",
                    c."name",
                    c."description",
                    cr."parent_category_id",
                    0 AS level,
                    ARRAY[c."category_id"] AS path
                FROM "categories" c
                LEFT JOIN "category_relationships" cr ON c."category_id" = cr."child_category_id"
                WHERE cr."parent_category_id" IS NULL
                
                UNION ALL
                
                SELECT 
                    c."category_id",
                    c."name",
                    c."description",
                    cr."parent_category_id",
                    ct.level + 1,
                    ct.path || c."category_id"
                FROM "categories" c
                JOIN "category_relationships" cr ON c."category_id" = cr."child_category_id"
                JOIN category_tree ct ON cr."parent_category_id" = ct."category_id"
            ), wisdom_counts AS (
                SELECT 
                    wc."category_id",
                    COUNT(DISTINCT wc."wisdom_id") as wisdom_count
                FROM "wisdom_categories" wc
                GROUP BY wc."category_id"
            )
            SELECT 
                ct."category_id",
                ct."name",
                ct."description",
                ct."parent_category_id",
                ct.level,
                ct.path,
                COALESCE(wc.wisdom_count, 0) as wisdom_count
            FROM category_tree ct
            LEFT JOIN wisdom_counts wc ON ct."category_id" = wc."category_id"
            ORDER BY ct.path
        `);

        function sortCategories(categories: Category[]): Category[] {
            return categories.sort((a, b) => {
                if (a.wisdom_count !== b.wisdom_count) {
                    return b.wisdom_count - a.wisdom_count; // Sort by wisdom_count descending
                }
                return a.name.localeCompare(b.name); // Then sort alphabetically
            });
        }

        const rootCategories = result.rows.filter(cat => !cat.parent_category_id);
        const sortedRootCategories = sortCategories(rootCategories);

        function sortCategoryTree(categories: Category[]): Category[] {
            return sortCategories(categories.map(category => ({
                ...category,
                children: category.children ? sortCategoryTree(category.children) : []
            })));
        }

        const sortedCategoryTree = sortCategoryTree(sortedRootCategories);

        return new Response(JSON.stringify(sortedCategoryTree), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in handleCategoriesHierarchy:', error);
        return new Response(JSON.stringify({ error: 'Database Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        if (client) client.release();
        await pool.end();
    }
}