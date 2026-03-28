import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.join(process.cwd(), ".next");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

if (!statSync(rootDir, { throwIfNoEntry: false })) {
  process.exit(0);
}

mkdirSync(rootDir, { recursive: true });

const compressibleExtensions = new Set([
  ".html",
  ".js",
  ".css",
  ".json",
  ".svg",
  ".txt",
  ".xml",
]);

for (const filePath of walk(rootDir)) {
  if (!compressibleExtensions.has(path.extname(filePath))) {
    continue;
  }

  const file = readFileSync(filePath);
  writeFileSync(`${filePath}.gz`, gzipSync(file, { level: 9 }));
  writeFileSync(
    `${filePath}.br`,
    brotliCompressSync(file, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 11,
      },
    }),
  );
}
