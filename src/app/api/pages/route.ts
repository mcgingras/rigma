import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "src/app/pages");

function ensurePagesDirectory() {
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
}

function getPageFilePath(name: string) {
  return path.join(PAGES_DIR, `${name}/page.tsx`);
}

export async function GET() {
  ensurePagesDirectory();
  const files = fs
    .readdirSync(PAGES_DIR)
    .filter((file) => fs.statSync(path.join(PAGES_DIR, file)).isDirectory())
    .map((dir) => {
      return {
        id: dir,
        name: dir,
        filePath: path.join(PAGES_DIR, dir, "page.tsx"),
      };
    });

  return NextResponse.json(files);
}

export async function POST(request: Request) {
  const { name, content } = await request.json();

  ensurePagesDirectory();
  const pageDir = path.join(PAGES_DIR, name);
  const filePath = path.join(pageDir, "page.tsx");

  // Create the directory if it doesn't exist
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
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

  return NextResponse.json({ success: true });
}
