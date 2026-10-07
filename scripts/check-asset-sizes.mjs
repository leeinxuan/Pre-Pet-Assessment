import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const assetRoot = path.resolve("public/assets");
const limits = {
  image: 2 * 1024 * 1024,
  video: 5 * 1024 * 1024,
  total: 220 * 1024 * 1024,
};
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const videoExtensions = new Set([".m4v", ".mov", ".mp4", ".webm"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(filePath));
    else if (entry.isFile()) files.push(filePath);
  }
  return files;
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const files = await collectFiles(assetRoot);
const fileSizes = await Promise.all(files.map(async (filePath) => ({ filePath, size: (await stat(filePath)).size })));
const totalSize = fileSizes.reduce((sum, file) => sum + file.size, 0);
const oversized = fileSizes.filter(({ filePath, size }) => {
  const extension = path.extname(filePath).toLowerCase();
  if (imageExtensions.has(extension)) return size > limits.image;
  if (videoExtensions.has(extension)) return size > limits.video;
  return false;
});

if (totalSize > limits.total) {
  oversized.push({ filePath: assetRoot, size: totalSize, total: true });
}

if (oversized.length) {
  console.error("Asset size check failed:");
  for (const entry of oversized) {
    const label = entry.total ? "public/assets total" : path.relative(process.cwd(), entry.filePath);
    const limit = entry.total ? limits.total : videoExtensions.has(path.extname(entry.filePath).toLowerCase()) ? limits.video : limits.image;
    console.error(`- ${label}: ${formatMiB(entry.size)} (limit ${formatMiB(limit)})`);
  }
  process.exit(1);
}

console.log(`Asset size check passed: ${files.length} files, ${formatMiB(totalSize)} total.`);
console.log(`Limits: images ${formatMiB(limits.image)}, videos ${formatMiB(limits.video)}, total ${formatMiB(limits.total)}.`);
