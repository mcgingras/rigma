import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import {
  getAllPages,
  createPage,
  createPageVersion,
  getPage,
  getPageVersionContent,
  migrateExistingPages,
} from "@/lib/pageUtils";

export async function GET() {
  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  // Migrate existing pages to new format if needed
  migrateExistingPages();

  const pages = getAllPages();
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
  const sourcePage = getPage(sourceId);
  if (!sourcePage) {
    return NextResponse.json(
      { error: "Source page not found" },
      { status: 404 }
    );
  }

  const content = getPageVersionContent(sourceId, sourcePage.currentVersionId);
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
