import fs from "fs";
import path from "path";

export const PAGES_DIR = path.join(process.cwd(), "pages");

export function ensurePagesDirectory() {
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }
}

export function getPageFilePath(name: string) {
  return path.join(PAGES_DIR, `${name}.tsx`);
}

export function copyPage(sourcePath: string, newName: string) {
  const newPath = getPageFilePath(newName);
  fs.copyFileSync(sourcePath, newPath);
  return newPath;
}

export function listPages() {
  ensurePagesDirectory();
  return fs
    .readdirSync(PAGES_DIR)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => {
      const name = path.basename(file, ".tsx");
      return {
        id: name,
        name,
        filePath: path.join(PAGES_DIR, file),
      };
    });
}

export function openInEditor(filePath: string) {
  // This will open the file in the system's default editor
  const { exec } = require("child_process");
  const command =
    process.platform === "win32"
      ? `start "" "${filePath}"`
      : `open "${filePath}"`;

  exec(command);
}
