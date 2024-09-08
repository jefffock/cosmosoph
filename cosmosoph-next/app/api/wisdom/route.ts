import { fetchFromWorker } from "@/lib/api";
import { NextResponse } from "next/server";
import { WisdomItem } from "../../../../shared/types";

export async function GET(): Promise<
  NextResponse<WisdomItem[] | { error: string }>
> {
  try {
    const wisdom = await fetchFromWorker<WisdomItem[]>("wisdom");
    return NextResponse.json(wisdom);
  } catch (error) {
    console.error("Error fetching wisdom:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
