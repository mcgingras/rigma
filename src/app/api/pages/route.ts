import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import fs from "fs";
import path from "path";
import {
  getAllPages,
  createPage,
  createPageVersion,
  getPage,
  getPageVersionContent,
  migrateExistingPages,
} from "../utils/pageUtils.server";

async function getStaticPages() {
  try {
    const staticPagesPath = path.join(
      process.cwd(),
      "public",
      "static-pages.json"
    );
    const data = await fs.promises.readFile(staticPagesPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading static pages:", error);
    return [];
  }
}

export async function GET() {
  if (!isDevMode()) {
    const pages = await getStaticPages();
    return NextResponse.json(pages);
  }

  // In dev mode, migrate and get live pages
  migrateExistingPages();
  const pages = await getAllPages();
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const { name, description, content } = await request.json();
  const page = createPage(name, description || `${name} page`, content);
  return NextResponse.json(page);
}

export async function PUT(request: Request) {
  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const { sourceId, versionName, description } = await request.json();

  // Get the source page and its current version content
  const sourcePage = await Promise.resolve(getPage(sourceId));
  if (!sourcePage) {
    return NextResponse.json(
      { error: "Source page not found" },
      { status: 404 }
    );
  }

  const content = await Promise.resolve(
    getPageVersionContent(sourceId, sourcePage.currentVersionId)
  );
  if (!content) {
    return NextResponse.json(
      { error: "Source content not found" },
      { status: 404 }
    );
  }

  // Create new version
  const page = createPageVersion(
    sourceId,
    versionName || `${sourcePage.name} - Copy`,
    description || "Copy of previous version",
    content
  );

  return NextResponse.json(page);
}
