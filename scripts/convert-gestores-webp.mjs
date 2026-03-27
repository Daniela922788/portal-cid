import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Seccion Gestores');

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

    const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');

    await sharp(fullPath)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 68, effort: 6 })
      .toFile(webpPath);

    console.log(`  ✓ convertido: ${path.relative(baseDir, webpPath)}`);
  }
}

console.log('Convirtiendo imágenes de Seccion Gestores a WebP…');
await convertDir(baseDir);
console.log('¡Listo!');
