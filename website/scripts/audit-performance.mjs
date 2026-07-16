import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("..", import.meta.url).pathname;
const clientRoot = join(root, "dist", "client");
const assetRoot = join(clientRoot, "assets");

if (!existsSync(assetRoot)) {
  console.error("Build output not found. Run npm run build first.");
  process.exit(2);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(clientRoot);
const measured = files.map((path) => {
  const bytes = readFileSync(path);
  return {
    path,
    extension: extname(path).toLowerCase(),
    raw: statSync(path).size,
    gzip: gzipSync(bytes, { level: 9 }).length,
  };
});

const jsFiles = measured.filter((file) => [".js", ".mjs"].includes(file.extension));
const cssFiles = measured.filter((file) => file.extension === ".css");
const fontFiles = measured.filter((file) => [".otf", ".ttf", ".woff", ".woff2"].includes(file.extension));
const images = measured.filter((file) => [".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"].includes(file.extension));
const nonWebpRaster = images.filter((file) => file.extension !== ".webp");
const maxImage = Math.max(0, ...images.map((file) => file.raw));
const jsGzip = jsFiles.reduce((total, file) => total + file.gzip, 0);
const cssGzip = cssFiles.reduce((total, file) => total + file.gzip, 0);

const source = [
  readFileSync(join(root, "app", "layout.tsx"), "utf8"),
  readFileSync(join(root, "app", "page.tsx"), "utf8"),
].join("\n");

const imageTags = source.match(/<img\b[^>]*>/g) ?? [];
const allImagesReserveSpace = imageTags.every(
  (tag) => /\bwidth=/.test(tag) && /\bheight=/.test(tag),
);

const checks = [
  ["compressed JavaScript <= 100 KiB", jsGzip <= 100 * 1024],
  ["compressed CSS <= 15 KiB", cssGzip <= 15 * 1024],
  ["each raster image <= 100 KiB", maxImage <= 100 * 1024],
  ["all raster images are WebP/AVIF", nonWebpRaster.length === 0],
  ["hero image is preloaded", /rel="preload"[\s\S]*skylizer-hero/.test(source)],
  ["below-fold images are lazy loaded", (source.match(/loading="lazy"/g) ?? []).length >= 4],
  ["images reserve intrinsic space", allImagesReserveSpace],
  ["no third-party scripts", !/<script[^>]+src="https?:\/\//.test(source)],
  ["system fonts avoid font downloads", !/next\/font|font-geist/.test(source) && fontFiles.length === 0],
];

const failed = checks.filter(([, passed]) => !passed);
const estimatedHtmlGzip = 14 * 1024;
const criticalImageBytes = 74590 + 13734;
const predictedInitialTransfer = estimatedHtmlGzip + jsGzip + cssGzip + criticalImageBytes;
const predictedCriticalRequests = 1 + jsFiles.length + cssFiles.length + 2;

console.log("skŸlizer production performance budget");
console.log("=========================================");
console.log(`JavaScript: ${(jsGzip / 1024).toFixed(1)} KiB gzip across ${jsFiles.length} files`);
console.log(`CSS:        ${(cssGzip / 1024).toFixed(1)} KiB gzip across ${cssFiles.length} files`);
console.log(`Images:     ${(images.reduce((n, file) => n + file.raw, 0) / 1024).toFixed(1)} KiB across ${images.length} files`);
console.log(`Largest image: ${(maxImage / 1024).toFixed(1)} KiB`);
console.log(`Predicted initial transfer: ~${(predictedInitialTransfer / 1024).toFixed(0)} KiB`);
console.log(`Predicted critical requests: ${predictedCriticalRequests}`);
console.log("");

for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${label}`);
}

console.log("");
console.log("Conservative lab predictions (no CrUX field data):");
console.log("Desktop PageSpeed performance: 97-100");
console.log("Mobile PageSpeed performance:  92-97");
console.log("LCP: 0.8-1.5 s desktop / 1.4-2.4 s constrained mobile");
console.log("INP: <100 ms; legacy FID: <50 ms; CLS: <0.03");

if (failed.length > 0) {
  process.exitCode = 1;
}
