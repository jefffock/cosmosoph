

import { fetchFromWorker } from "@/lib/api";
import { NextResponse } from 'next/server';
import { Category } from "../../../../shared/types";

export async function GET(): Promise<NextResponse<Category[] | { error: string }>> {
	try {
		const categories = await fetchFromWorker<Category[]>('categories');
		console.log('rowsss:>>', categories);

		return NextResponse.json(categories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}