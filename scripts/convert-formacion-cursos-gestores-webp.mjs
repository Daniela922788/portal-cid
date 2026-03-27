import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'client', 'public');
const targetFolders = ['gestores', 'Formacion', 'cursos'];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertDir(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    console.log(`Folder not found, skipping: ${dir}`);
    return;
  }

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
        console.log(`Skipped (up to date): ${path.relative(publicDir, fullPath)}`);
        continue;
      }
    }

    await sharp(fullPath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(webpPath);

    const rel = path.relative(publicDir, fullPath);
    console.log(`Converted: ${rel} -> ${rel.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
  }
}

async function main() {
  for (const folder of targetFolders) {
    const folderPath = path.join(publicDir, folder);
    console.log(`\nProcessing: ${folder}/`);
    await convertDir(folderPath);
  }
  console.log('\nWebP conversion completed for gestores, Formacion, and cursos.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
