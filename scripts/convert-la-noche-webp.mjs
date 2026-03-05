import path from 'node:path';
import sharp from 'sharp';

const sourcePath = path.resolve(process.cwd(), 'client', 'public', 'la noche de los mejores.jpg');
const outputPath = path.resolve(process.cwd(), 'client', 'public', 'la noche de los mejores.webp');

async function main() {
  await sharp(sourcePath)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(outputPath);

  console.log('Converted:', sourcePath, '->', outputPath);
}

main().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});
