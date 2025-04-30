import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isDevMode } from "@/lib/mode";

const PAGES_DIR = path.join(process.cwd(), "src/app/pages");

// Static list of pages for production
let STATIC_PAGES = [
  { id: "one", name: "One" },
  { id: "new_page_copy", name: "New Page Copy" },
];

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

  STATIC_PAGES = files;
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
  return NextResponse.json(STATIC_PAGES);
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

  const { sourcePath, newName } = await request.json();

  ensurePagesDirectory();
  const newPageDir = path.join(PAGES_DIR, newName);
  const newFilePath = path.join(newPageDir, "page.tsx");

  // Create the new directory
  if (!fs.existsSync(newPageDir)) {
    fs.mkdirSync(newPageDir, { recursive: true });
  }

  // Copy the file
  fs.copyFileSync(sourcePath, newFilePath);
  updateStaticPages();

  return NextResponse.json({ success: true });
}
