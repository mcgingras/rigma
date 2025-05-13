import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import { getPage } from "../../../utils/pageUtils.server";
import { generateScreenshot, ensureScreenshot } from "@/lib/screenshot";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pageId = id;

  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  const page = await getPage(pageId);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const searchParams = new URL(request.url).searchParams;
  const versionId = searchParams.get("version") || page.currentVersionId;
  const forceGenerate = searchParams.get("force") === "true";

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
