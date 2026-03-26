import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Converts all jpg/jpeg/png images recursively under Semana STEM
const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Semana STEM');

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await convertDir(fullPath);
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    const sourceStat = await fs.stat(fullPath);
    const webpAlreadyExists = await exists(webpPath);

    if (webpAlreadyExists) {
      const webpStat = await fs.stat(webpPath);
      if (webpStat.mtimeMs >= sourceStat.mtimeMs) {
        console.log(`Skipped (up to date): ${path.relative(baseDir, fullPath)}`);
        continue;
      }
    }

    await sharp(fullPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(webpPath);

    const rel = path.relative(baseDir, fullPath);
    console.log(`Converted: ${rel} -> ${rel.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
  }
}

async function main() {
  await convertDir(baseDir);
  console.log('\nWebP conversion completed for Semana STEM.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
