"use server";

import fs from "fs";
import path from "path";
import { Page, PageVersion } from "@/types/page";

const PAGES_DIR = path.join(process.cwd(), "src/app/pages");

// Ensure the pages directory exists
export async function ensurePagesDirectory() {
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
}

// Migrate existing pages to new format
export async function migrateExistingPages() {
  if (!fs.existsSync(PAGES_DIR)) return;

  const directories = fs
    .readdirSync(PAGES_DIR)
    .filter((file) => fs.statSync(path.join(PAGES_DIR, file)).isDirectory());

  directories.forEach((dir) => {
    const pageDir = path.join(PAGES_DIR, dir);
    const metaPath = path.join(pageDir, "meta.json");
    const pagePath = path.join(pageDir, "page.tsx");

    // Skip if already migrated
    if (fs.existsSync(metaPath)) return;

    // Only migrate if page.tsx exists
    if (!fs.existsSync(pagePath)) return;

    const now = new Date();

    // Create page metadata
    const page: Page = {
      id: dir,
      name: dir.replace(/_/g, " "),
      description: `${dir.replace(/_/g, " ")} page`,
      versions: [
        {
          id: "v1",
          name: "Initial Version",
          description: "Migrated from original page",
          createdAt: now,
          updatedAt: now,
        },
      ],
      currentVersionId: "v1",
      createdAt: now,
      updatedAt: now,
    };

    // Create version directory structure
    const versionDir = path.join(pageDir, "versions", "v1");
    fs.mkdirSync(versionDir, { recursive: true });

    // Move the original page.tsx to the version directory
    fs.renameSync(pagePath, path.join(versionDir, "page.tsx"));

    // Write metadata
    fs.writeFileSync(metaPath, JSON.stringify(page, null, 2));
  });
}

// Create a new page
export async function createPage(
  name: string,
  description: string,
  content: string
): Promise<Page> {
  const pageId = name.toLowerCase().replace(/\s+/g, "-");
  const versionId = "v1";
  const now = new Date();

  const page: Page = {
    id: pageId,
    name,
    description,
    versions: [
      {
        id: versionId,
        name: `${name} - Initial Version`,
        description: "Initial version",
        createdAt: now,
        updatedAt: now,
      },
    ],
    currentVersionId: versionId,
    createdAt: now,
    updatedAt: now,
  };

  const pageDir = path.join(PAGES_DIR, pageId);
  const versionsDir = path.join(pageDir, "versions", versionId);

  // Create directory structure
  fs.mkdirSync(versionsDir, { recursive: true });

  // Write page metadata
  fs.writeFileSync(
    path.join(pageDir, "meta.json"),
    JSON.stringify(page, null, 2)
  );

  // Write version content
  fs.writeFileSync(path.join(versionsDir, "page.tsx"), content);

  return page;
}

// Create a new version of a page
export async function createPageVersion(
  pageId: string,
  versionName: string,
  description: string,
  content: string
): Promise<Page> {
  const pageDir = path.join(PAGES_DIR, pageId);
  const metaPath = path.join(pageDir, "meta.json");

  if (!fs.existsSync(metaPath)) {
    throw new Error(`Page ${pageId} not found`);
  }

  // Read existing page metadata
  const page: Page = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

  // Create new version
  const now = new Date();
  const versionId = `v${page.versions.length + 1}`;
  const newVersion: PageVersion = {
    id: versionId,
    name: versionName,
    description,
    createdAt: now,
    updatedAt: now,
  };

  // Update page metadata
  page.versions.push(newVersion);
  page.currentVersionId = versionId;
  page.updatedAt = now;

  // Create version directory and save content
  const versionDir = path.join(pageDir, "versions", versionId);
  fs.mkdirSync(versionDir, { recursive: true });
  fs.writeFileSync(path.join(versionDir, "page.tsx"), content);

  // Save updated metadata
  fs.writeFileSync(metaPath, JSON.stringify(page, null, 2));

  return page;
}

// Get all pages
export async function getAllPages(): Promise<Page[]> {
  ensurePagesDirectory();

  if (!fs.existsSync(PAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PAGES_DIR)
    .filter((dir) => fs.statSync(path.join(PAGES_DIR, dir)).isDirectory())
    .map((dir) => {
      const metaPath = path.join(PAGES_DIR, dir, "meta.json");
      if (fs.existsSync(metaPath)) {
        return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      }
      return null;
    })
    .filter((page): page is Page => page !== null);
}

// Get a specific page
export async function getPage(pageId: string): Promise<Page | null> {
  const metaPath = path.join(PAGES_DIR, pageId, "meta.json");

  if (!fs.existsSync(metaPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

// Get page content for a specific version
export async function getPageVersionContent(
  pageId: string,
  versionId: string
): Promise<string | null> {
  const contentPath = path.join(
    PAGES_DIR,
    pageId,
    "versions",
    versionId,
    "page.tsx"
  );

  if (!fs.existsSync(contentPath)) {
    return null;
  }

  return fs.readFileSync(contentPath, "utf-8");
}

// Switch to a different version
export async function switchVersion(
  pageId: string,
  versionId: string
): Promise<Page | null> {
  const pageDir = path.join(PAGES_DIR, pageId);
  const metaPath = path.join(pageDir, "meta.json");

  if (!fs.existsSync(metaPath)) {
    return null;
  }

  const page: Page = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

  if (!page.versions.find((v) => v.id === versionId)) {
    return null;
  }

  page.currentVersionId = versionId;
  page.updatedAt = new Date();

  fs.writeFileSync(metaPath, JSON.stringify(page, null, 2));

  return page;
}
