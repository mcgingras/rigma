import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import { getPage } from "../../utils/pageUtils.server";
import { readFileSync, writeFileSync } from "fs";
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Updates not available in production" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { description } = body;

    if (typeof description !== "string") {
      return NextResponse.json(
        { error: "Invalid description" },
        { status: 400 }
      );
    }

    const page = await getPage(id);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Update the page metadata
    const metaPath = join(process.cwd(), "src/app/pages", id, "meta.json");
    const updatedPage: Page = {
      ...page,
      description,
      updatedAt: new Date(),
    };

    writeFileSync(metaPath, JSON.stringify(updatedPage, null, 2));
    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}
