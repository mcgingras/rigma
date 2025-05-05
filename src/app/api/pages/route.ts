import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isDevMode } from "@/lib/mode";

const PAGES_DIR = path.join(process.cwd(), "src/app/pages");
const STATIC_PAGES_FILE = path.join(process.cwd(), "public/static-pages.json");

// Function to read static pages from file
async function readStaticPages(): Promise<{ id: string; name: string }[]> {
  if (isDevMode()) {
    if (fs.existsSync(STATIC_PAGES_FILE)) {
      return JSON.parse(fs.readFileSync(STATIC_PAGES_FILE, "utf-8"));
    }
  } else {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/static-pages.json`
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching static pages:", error);
    }
  }

  // Default pages if file doesn't exist or fetch fails
  return [
    {
      id: "bento",
      name: "bento",
    },
    {
      id: "bento_copy",
      name: "bento_copy",
    },
    {
      id: "brand",
      name: "brand",
    },
    {
      id: "brand_copy",
      name: "brand_copy",
    },
    {
      id: "framer-modals",
      name: "framer-modals",
    },
    {
      id: "home",
      name: "home",
    },
    {
      id: "home_copy",
      name: "home_copy",
    },
  ];
}

// Function to write static pages to file
function writeStaticPages(pages: { id: string; name: string }[]) {
  fs.writeFileSync(STATIC_PAGES_FILE, JSON.stringify(pages, null, 2));
}

// Function to update STATIC_PAGES from filesystem
function updateStaticPages() {
  if (!isDevMode()) return;

  const files = fs
    .readdirSync(PAGES_DIR)
    .filter((file) => fs.statSync(path.join(PAGES_DIR, file)).isDirectory())
    .map((dir) => ({
      id: dir,
      name: dir,
    }));

  writeStaticPages(files);
}

function ensurePagesDirectory() {
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
}

export async function GET() {
  if (isDevMode()) {
    updateStaticPages();
  }
  const pages = await readStaticPages();
  return NextResponse.json(pages);
}

export async function POST(request: Request) {
  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const { name, content } = await request.json();

  ensurePagesDirectory();
  const pageDir = path.join(PAGES_DIR, name);
  const filePath = path.join(pageDir, "page.tsx");

  // Create the directory if it doesn't exist
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);
  updateStaticPages();

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const { sourceId, newName } = await request.json();

  ensurePagesDirectory();
  const sourceDir = path.join(PAGES_DIR, sourceId);
  const sourceFilePath = path.join(sourceDir, "page.tsx");
  const newPageDir = path.join(PAGES_DIR, newName);
  const newFilePath = path.join(newPageDir, "page.tsx");

  // Check if source exists
  if (!fs.existsSync(sourceFilePath)) {
    return NextResponse.json(
      { error: "Source page not found" },
      { status: 404 }
    );
  }

  // Create the new directory
  if (!fs.existsSync(newPageDir)) {
    fs.mkdirSync(newPageDir, { recursive: true });
  }

  // Read source file and write to new file
  const content = fs.readFileSync(sourceFilePath, "utf-8");
  fs.writeFileSync(newFilePath, content);
  updateStaticPages();

  return NextResponse.json({ success: true });
}
