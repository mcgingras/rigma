import { NextResponse } from "next/server";
import { takeScreenshot } from "@/lib/screenshot";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    // Extract the pageId from the URL - it's the second to last segment
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const pageId = segments[segments.length - 2]; // Get the segment before 'screenshot'

    if (!pageId) {
      return NextResponse.json({ error: "Page ID not found" }, { status: 400 });
    }

    const screenshotPath = await takeScreenshot(pageId);
    return NextResponse.json({ url: screenshotPath });
  } catch (error) {
    console.error("Error generating screenshot:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 }
    );
  }
}
