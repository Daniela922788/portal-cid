import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Seccion Gestores');

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

    const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');

    if (await exists(webpPath)) {
      console.log(`  skip (ya existe): ${path.relative(baseDir, webpPath)}`);
      continue;
    }

    await sharp(fullPath)
      .webp({ quality: 82 })
      .toFile(webpPath);

    console.log(`  ✓ convertido: ${path.relative(baseDir, webpPath)}`);
  }
}

console.log('Convirtiendo imágenes de Seccion Gestores a WebP…');
await convertDir(baseDir);
console.log('¡Listo!');
