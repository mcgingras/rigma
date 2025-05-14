import { NextResponse } from "next/server";
import { isDevMode } from "@/lib/mode";
import { getPage } from "../../../../utils/pageUtils.server";
import { writeFileSync, rmSync } from "fs";
import { join } from "path";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  const { id, versionId } = await params;

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

    const version = page.versions.find((v) => v.id === versionId);
    if (!version) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Update the version description
    version.description = description;
    version.updatedAt = new Date();
    page.updatedAt = new Date();

    // Save the updated page metadata
    const metaPath = join(process.cwd(), "src/app/pages", id, "meta.json");
    writeFileSync(metaPath, JSON.stringify(page, null, 2));

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error updating version:", error);
    return NextResponse.json(
      { error: "Failed to update version" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  const { id, versionId } = await params;

  if (!isDevMode()) {
    return NextResponse.json(
      { error: "Updates not available in production" },
      { status: 403 }
    );
  }

  try {
    const page = await getPage(id);
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Don't allow deleting the last version
    if (page.versions.length <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last version" },
        { status: 400 }
      );
    }

    // Don't allow deleting the current version
    if (versionId === page.currentVersionId) {
      return NextResponse.json(
        { error: "Cannot delete the current version" },
        { status: 400 }
      );
    }

    const versionIndex = page.versions.findIndex((v) => v.id === versionId);
    if (versionIndex === -1) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Remove the version from the versions array
    page.versions.splice(versionIndex, 1);
    page.updatedAt = new Date();

    // Delete the version directory
    const versionPath = join(
      process.cwd(),
      "src/app/pages",
      id,
      "versions",
      versionId
    );
    try {
      rmSync(versionPath, { recursive: true });
    } catch (error) {
      console.error("Error deleting version directory:", error);
    }

    // Save the updated page metadata
    const metaPath = join(process.cwd(), "src/app/pages", id, "meta.json");
    writeFileSync(metaPath, JSON.stringify(page, null, 2));

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error deleting version:", error);
    return NextResponse.json(
      { error: "Failed to delete version" },
      { status: 500 }
    );
  }
}
