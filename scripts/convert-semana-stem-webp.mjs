import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const baseDir = path.resolve(process.cwd(), 'client', 'public', 'Semana STEM', '23');
const targetDirs = ['Agenda', 'Galeria'];

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertDirectory(relativeDir) {
  const dirPath = path.join(baseDir, relativeDir);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const sourcePath = path.join(dirPath, entry.name);
    const ext = path.extname(entry.name).toLowerCase();

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const webpPath = sourcePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    const sourceStat = await fs.stat(sourcePath);
    const webpExists = await exists(webpPath);

    if (webpExists) {
      const webpStat = await fs.stat(webpPath);
      if (webpStat.mtimeMs >= sourceStat.mtimeMs) {
        continue;
      }
    }

    await sharp(sourcePath)
      .webp({ quality: 78, effort: 4 })
      .toFile(webpPath);

    console.log(`Converted: ${path.relative(process.cwd(), sourcePath)} -> ${path.relative(process.cwd(), webpPath)}`);
  }
}

async function main() {
  for (const dir of targetDirs) {
    await convertDirectory(dir);
  }
  console.log('WebP conversion completed for Semana STEM assets.');
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
