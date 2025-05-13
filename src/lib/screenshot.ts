import puppeteer from "puppeteer";
import { join } from "path";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";

const SCREENSHOTS_DIR = join(process.cwd(), "public/screenshots");
const HASHES_DIR = join(SCREENSHOTS_DIR, ".hashes");

// Ensure directories exist
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!existsSync(HASHES_DIR)) {
  mkdirSync(HASHES_DIR, { recursive: true });
}

function getPageContentHash(pageId: string, versionId: string): string {
  const pagePath = join(
    process.cwd(),
    "src/app/pages",
    pageId,
    "versions",
    versionId,
    "page.tsx"
  );
  const content = readFileSync(pagePath, "utf-8");
  return createHash("sha256").update(content).digest("hex");
}

function getStoredHash(pageId: string, versionId: string): string | null {
  const hashPath = join(HASHES_DIR, `${pageId}_${versionId}.hash`);
  if (existsSync(hashPath)) {
    return readFileSync(hashPath, "utf-8");
  }
  return null;
}

function storeHash(pageId: string, versionId: string, hash: string) {
  const hashPath = join(HASHES_DIR, `${pageId}_${versionId}.hash`);
  writeFileSync(hashPath, hash);
}

export async function generateScreenshot(
  pageId: string,
  versionId: string
): Promise<string> {
  console.log("we are generating a new screenshot");
  const screenshotPath = join(SCREENSHOTS_DIR, `${pageId}_${versionId}.png`);

  // Check if we need to regenerate the screenshot
  const currentHash = getPageContentHash(pageId, versionId);
  const storedHash = getStoredHash(pageId, versionId);

  if (existsSync(screenshotPath) && currentHash === storedHash) {
    return `/screenshots/${pageId}_${versionId}.png`;
  }

  // Launch browser and generate screenshot
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  // Navigate to the page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}/pages/${pageId}/versions/${versionId}`;
  console.log("fullUrl", fullUrl);
  await page.goto(fullUrl, {
    waitUntil: "networkidle0",
  });

  // Take screenshot
  await page.screenshot({
    path: screenshotPath,
    type: "png",
  });

  await browser.close();

  // Store the new hash
  storeHash(pageId, versionId, currentHash);

  return `/screenshots/${pageId}_${versionId}.png`;
}

export async function ensureScreenshot(
  pageId: string,
  versionId: string
): Promise<string> {
  const screenshotPath = join(SCREENSHOTS_DIR, `${pageId}_${versionId}.png`);

  if (!existsSync(screenshotPath)) {
    return generateScreenshot(pageId, versionId);
  }

  return `/screenshots/${pageId}_${versionId}.png`;
}
