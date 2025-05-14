import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import { getPage } from "../../utils/pageUtils.server";
import { readFileSync } from "fs";
import { join } from "path";
import { Page } from "@/types/page";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (isDevMode()) {
    const page = await getPage(id);

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  }

  // In production, read from static-pages.json
  try {
    const staticPagesPath = join(process.cwd(), "public", "static-pages.json");
    const staticPages = JSON.parse(
      readFileSync(staticPagesPath, "utf-8")
    ) as Page[];
    const page = staticPages.find((p) => p.id === id);

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error reading static pages:", error);
    return NextResponse.json(
      { error: "Failed to read page data" },
      { status: 500 }
    );
  }
}
