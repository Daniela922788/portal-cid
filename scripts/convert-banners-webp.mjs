import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dirs = [
  path.resolve(process.cwd(), 'client', 'public', 'banners'),
  path.resolve(process.cwd(), 'client', 'public', 'Home'),
];

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
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const sourcePath = path.join(dir, entry.name);
    const webpPath = sourcePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    const sourceStat = await fs.stat(sourcePath);
    const webpAlreadyExists = await exists(webpPath);

    if (webpAlreadyExists) {
      const webpStat = await fs.stat(webpPath);
      if (webpStat.mtimeMs >= sourceStat.mtimeMs) {
        console.log(`Skipped (up to date): ${entry.name}`);
        continue;
      }
    }

    await sharp(sourcePath)
      .webp({ quality: 82, effort: 5 })
      .toFile(webpPath);

    console.log(`Converted: ${entry.name} -> ${entry.name.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
  }
}

async function main() {
  for (const dir of dirs) {
    console.log(`\nProcessing: ${dir}`);
    await convertDir(dir);
  }
  console.log('\nWebP conversion completed for banners and Home.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
