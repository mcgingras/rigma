import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import { getPage } from "../../../utils/pageUtils.server";
import { generateScreenshot, ensureScreenshot } from "@/lib/screenshot";
import { existsSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pageId = id;

  const page = await getPage(pageId);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const searchParams = new URL(request.url).searchParams;
  const versionId = searchParams.get("version") || page.currentVersionId;
  const forceGenerate = searchParams.get("force") === "true";

  // In production, we only check for existing screenshots
  if (!isDevMode()) {
    const screenshotPath = join(
      process.cwd(),
      "public/screenshots",
      `${pageId}_${versionId}.png`
    );

    if (!existsSync(screenshotPath)) {
      return NextResponse.json(
        { error: "Screenshot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      url: `/screenshots/${pageId}_${versionId}.png`,
    });
  }

  // In development, we can generate new screenshots
  try {
    const screenshotUrl = forceGenerate
      ? await generateScreenshot(pageId, versionId)
      : await ensureScreenshot(pageId, versionId);

    return NextResponse.json({ url: screenshotUrl });
  } catch (error) {
    console.error("Error generating screenshot:", error);
    return NextResponse.json(
      { error: "Failed to generate screenshot" },
      { status: 500 }
    );
  }
}
