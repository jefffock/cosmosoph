
import { fetchFromWorker } from "@/lib/api";
import { NextResponse } from 'next/server';
import { WisdomRow } from "../../../../shared/types";

export async function GET(): Promise<NextResponse<WisdomRow[] | { error: string }>> {
	try {
		const wisdom = await fetchFromWorker<WisdomRow[]>('wisdom');
		return NextResponse.json(wisdom);
	} catch (error) {
		console.error('Error fetching wisdom:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}