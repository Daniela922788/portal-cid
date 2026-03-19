import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Semana STEM', '25');

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const sourcePath = path.join(baseDir, entry.name);
    const webpPath = sourcePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    const sourceStat = await fs.stat(sourcePath);
    const webpExists = await exists(webpPath);

    if (webpExists) {
      const webpStat = await fs.stat(webpPath);
      if (webpStat.mtimeMs >= sourceStat.mtimeMs) {
        console.log(`Skipped (up to date): ${entry.name}`);
        continue;
      }
    }

    await sharp(sourcePath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(webpPath);

    console.log(`Converted: ${entry.name} -> ${entry.name.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
  }

  console.log('WebP conversion completed for Semana STEM 25.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
