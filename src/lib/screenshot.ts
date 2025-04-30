import puppeteer from "puppeteer";
import { join } from "path";
import { mkdirSync, existsSync } from "fs";

const SCREENSHOTS_DIR = join(process.cwd(), "public/screenshots");

// Ensure screenshots directory exists
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

export async function takeScreenshot(pageId: string) {
  const screenshotPath = join(SCREENSHOTS_DIR, `${pageId}.png`);
  const publicPath = `/screenshots/${pageId}.png`;

  // Check if screenshot already exists
  if (existsSync(screenshotPath)) {
    console.log(`Using existing screenshot for ${pageId}`);
    return publicPath;
  }

  // If no existing screenshot, take a new one
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // Debug logging
    const url = `http://localhost:3000/app/pages/${pageId}/page`;
    console.log("Attempting to navigate to:", url);

    // Navigate to the page - using Next.js internal routing
    const response = await page.goto(url, {
      waitUntil: "networkidle0",
    });

    // Log the response status
    console.log("Navigation response status:", response?.status());

    // Take screenshot
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`Created new screenshot for ${pageId}`);
    return publicPath;
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  } finally {
    await browser.close();
  }
}
