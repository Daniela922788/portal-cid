import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imageDir = path.resolve(process.cwd(), 'client', 'public', 'la noche de los mejores');

async function main() {
  const entries = await fs.readdir(imageDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const sourcePath = path.join(imageDir, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.jfif'].includes(ext)) continue;

    const outputPath = sourcePath.replace(/\.(jpg|jpeg|png|jfif)$/i, '.webp');

    await sharp(sourcePath)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(outputPath);

    console.log(`Converted: ${path.relative(process.cwd(), sourcePath)} -> ${path.relative(process.cwd(), outputPath)}`);
  }

  console.log('La Noche de los Mejores folder WebP conversion completed.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
