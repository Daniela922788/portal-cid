import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'client', 'public', 'images');
const input = path.join(publicDir, 'Fondoprueba.png');

if (!fs.existsSync(input)) {
  console.error('Input image not found:', input);
  process.exit(1);
}

async function convert() {
  try {
    await sharp(input)
      .resize({ width: 1600 })
      .toFile(path.join(publicDir, 'Fondoprueba@1600.webp'));

    await sharp(input)
      .resize({ width: 800 })
      .toFile(path.join(publicDir, 'Fondoprueba@800.webp'));

    await sharp(input)
      .resize({ width: 1600 })
      .avif({ quality: 60 })
      .toFile(path.join(publicDir, 'Fondoprueba@1600.avif'));

    await sharp(input)
      .resize({ width: 800 })
      .avif({ quality: 60 })
      .toFile(path.join(publicDir, 'Fondoprueba@800.avif'));

    console.log('Converted images written to', publicDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

convert();
