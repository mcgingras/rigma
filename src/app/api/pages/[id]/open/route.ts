import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "src/app/pages");

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const filePath = path.join(PAGES_DIR, params.id, "page.tsx");

  try {
    const command =
      process.platform === "win32"
        ? `start "" "${filePath}"`
        : `open "${filePath}"`;

    exec(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
