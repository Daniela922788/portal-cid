// optimizar-gestores.mjs
// Redimensiona y recomprime los .webp pesados de la sección Gestores.
// - Crea backup de cada original en una subcarpeta "_originales/"
// - Es reejecutable: si ya hay backup, parte de ese original (no pierde calidad)
//
// Uso (con el script dentro de la carpeta client\):  node optimizar-gestores.mjs

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Carpeta donde está este script (client\), sin importar desde dónde lo ejecutes.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Configuración ────────────────────────────────────────────────────────────
// Ruta relativa a este script. El script vive en client\, así que apuntamos a public\...
const DIR = path.resolve(__dirname, "public/Seccion Gestores"); // carpeta a optimizar
const MAX_WIDTH = 1600;   // ancho máximo en píxeles (baja a 1280 si quieres aún más ligero)
const QUALITY = 80;       // calidad WebP 0-100 (80 = buen punto calidad/peso)
// ──────────────────────────────────────────────────────────────────────────────

const BACKUP = path.join(DIR, "_originales");

await fs.mkdir(BACKUP, { recursive: true });

const files = (await fs.readdir(DIR)).filter((f) =>
  f.toLowerCase().endsWith(".webp")
);

if (files.length === 0) {
  console.log("No se encontraron archivos .webp en:", DIR);
  process.exit(0);
}

let totalAntes = 0;
let totalDespues = 0;

for (const file of files) {
  const original = path.join(DIR, file);
  const backup = path.join(BACKUP, file);

  // Si ya existe backup, usamos ese como fuente (evita recomprimir lo ya comprimido).
  let source = original;
  try {
    await fs.access(backup);
    source = backup;
  } catch {
    await fs.copyFile(original, backup);
  }

  const inputBuffer = await fs.readFile(source);
  const antes = inputBuffer.length;

  const meta = await sharp(inputBuffer).metadata();

  const pipeline = sharp(inputBuffer).rotate(); // respeta orientación EXIF
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH });
  }

  const outputBuffer = await pipeline
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  await fs.writeFile(original, outputBuffer);

  const despues = outputBuffer.length;
  totalAntes += antes;
  totalDespues += despues;

  const kbA = (antes / 1024).toFixed(0).padStart(5);
  const kbD = (despues / 1024).toFixed(0).padStart(5);
  console.log(`${file.padEnd(18)} ${kbA} KB  →  ${kbD} KB`);
}

console.log("─".repeat(48));
console.log(
  `TOTAL: ${(totalAntes / 1024 / 1024).toFixed(1)} MB  →  ${(
    totalDespues / 1024 / 1024
  ).toFixed(1)} MB`
);
console.log("\nBackups de los originales en:", BACKUP);
