import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Centro Audiovisual');

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

    await sharp(fullPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(webpPath);

    const relPath = path.relative(baseDir, fullPath);
    console.log(`Converted: ${relPath} -> ${relPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
  }
}

async function main() {
  await convertDir(baseDir);
  console.log('\nWebP conversion completed for Centro Audiovisual.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
