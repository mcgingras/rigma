import fs from "fs";
import path from "path";

export const PAGES_DIR = path.join(process.cwd(), "pages");

export function ensurePagesDirectory() {
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
}
