import puppeteer from "puppeteer";
import { join } from "path";
import {
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from "fs";
import { createHash } from "crypto";
import { isDevMode } from "@/lib/mode";

const SCREENSHOTS_DIR = join(process.cwd(), "public/screenshots");
const HASHES_DIR = join(process.cwd(), "public/screenshots/.hashes");

// Ensure directories exist
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!existsSync(HASHES_DIR)) {
  mkdirSync(HASHES_DIR, { recursive: true });
}

function getPageContentHash(pageId: string): string {
  const pagePath = join(process.cwd(), "src/app/pages", pageId, "page.tsx");
  console.log("Reading page from:", pagePath);
  const content = readFileSync(pagePath, "utf-8");
  return createHash("sha256").update(content).digest("hex");
}

function getStoredHash(pageId: string): string | null {
  const hashPath = join(HASHES_DIR, `${pageId}.hash`);
  if (existsSync(hashPath)) {
    return readFileSync(hashPath, "utf-8");
  }
  return null;
}

function storeHash(pageId: string, hash: string) {
  const hashPath = join(HASHES_DIR, `${pageId}.hash`);
  writeFileSync(hashPath, hash);
}

function deleteScreenshot(pageId: string) {
  const screenshotPath = join(SCREENSHOTS_DIR, `${pageId}.png`);
  const hashPath = join(HASHES_DIR, `${pageId}.hash`);

  if (existsSync(screenshotPath)) {
    unlinkSync(screenshotPath);
  }
  if (existsSync(hashPath)) {
    unlinkSync(hashPath);
  }
}

export async function takeScreenshot(pageId: string) {
  const isDev = isDevMode();
  console.log("Taking screenshot for page:", pageId);

  const screenshotPath = join(SCREENSHOTS_DIR, `${pageId}.png`);
  const publicPath = `/screenshots/${pageId}.png`;

  // In prod, just return screenshots. Theres no way for them to be diffed.
  if (!isDev) {
    return publicPath;
  }

  // Get current and stored hashes
  const currentHash = getPageContentHash(pageId);
  const storedHash = getStoredHash(pageId);
  console.log("Current hash:", currentHash);
  console.log("Stored hash:", storedHash);

  // Check if screenshot exists and content hasn't changed
  if (existsSync(screenshotPath) && storedHash === currentHash) {
    console.log(`Using existing screenshot for ${pageId} (content unchanged)`);
    return publicPath;
  }

  // If no existing screenshot or content changed, take a new one
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // Debug logging
    const url = `http://localhost:3000/pages/${pageId}`;
    console.log("Attempting to navigate to:", url);

    // Navigate to the page - using Next.js routing
    const response = await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // Log the response status and URL
    console.log("Navigation response status:", response?.status());
    console.log("Final URL after navigation:", await page.url());

    // If we got a 404, delete the existing screenshot and hash
    if (response?.status() === 404) {
      console.log("Page returned 404, deleting existing screenshot and hash");
      deleteScreenshot(pageId);
      throw new Error("Page not found");
    }

    // Take screenshot
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Store the new hash
    storeHash(pageId, currentHash);

    console.log(`Created new screenshot for ${pageId} (content changed)`);
    return publicPath;
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
