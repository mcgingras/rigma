import fs from "fs";
import path from "path";
import { getAllPages } from "../src/app/api/utils/pageUtils.server";

async function buildPages() {
  // Get all pages
  const pages = await getAllPages();

  // Create the public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write pages to a static JSON file
  fs.writeFileSync(
    path.join(publicDir, "static-pages.json"),
    JSON.stringify(pages, null, 2)
  );

  console.log("✨ Static pages data generated successfully");
}

buildPages().catch(console.error);
