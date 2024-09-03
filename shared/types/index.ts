interface Category {
    category_id: number;
    name: string;
    description: string | null;
    children: Category[];
}

export interface WisdomRow {
	wisdom_id: number;
	content: string;
	author: string | null;
	source_id: number | null;
	created_at: string;
	updated_at: string;
}