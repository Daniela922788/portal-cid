import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetsDir = path.resolve(process.cwd(), "client", "src", "assets");

const imageNames = [
  "Alejandra.png",
  "Isabel.png",
  "Julian.png",
  "Karen.png",
  "Mauricio.png",
  "Mònica.png",
  "Nicolas.png",
  "Santiago.png",
  "Tania.png",
  "Victor.png",
  "Wilmar.png",
  "Alex.png",
  "Angela.png",
  "Camilo.png",
  "Caro.png",
  "Daniela.png",
  "Dubiel.png",
  "Hernan.png",
  "Jairo.png",
  "Jhon.png",
  "John.png",
  "Jorge.png",
  "Yethy.png",
];

async function optimizeImage(fileName) {
  const input = path.join(assetsDir, fileName);

  if (!fs.existsSync(input)) {
    console.warn(`⚠️  No encontrado: ${fileName}`);
    return;
  }

  const output = path.join(assetsDir, `${path.parse(fileName).name}.webp`);

  await sharp(input)
    .rotate()
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 72, effort: 5 })
    .toFile(output);

  const inputSizeKb = fs.statSync(input).size / 1024;
  const outputSizeKb = fs.statSync(output).size / 1024;
  const reduction = ((1 - outputSizeKb / inputSizeKb) * 100).toFixed(1);

  console.log(
    `${fileName} -> ${path.basename(output)} | ${inputSizeKb.toFixed(1)}KB -> ${outputSizeKb.toFixed(1)}KB (${reduction}% menos)`
  );
}

async function run() {
  for (const imageName of imageNames) {
    await optimizeImage(imageName);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
