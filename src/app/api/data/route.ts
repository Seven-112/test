import { NextResponse } from "next/server";
import rawData from "@/data/data.json";
import { normalizeToCatalog } from "@/utils/normalizer";
import type { Catalog } from "@/utils/type";

export async function GET() {
  try {
    const catalog: Catalog = normalizeToCatalog(rawData);
    return NextResponse.json(catalog, { status: 200 });
  } catch (error) {
    console.error("API /catalog error:", error);
    return NextResponse.json({ message: "Failed to load catalog" }, { status: 500 });
  }
}