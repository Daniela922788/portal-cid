// optimizar-imagenes.mjs
// Genera una versión .webp (redimensionada y comprimida) de cada imagen
// .jpg / .jpeg / .png dentro de una carpeta, recorriéndola de forma recursiva.
//
// Tu código (getPreferredImageSrc) ya cambia la extensión a .webp, así que
// con solo crear esos archivos al lado de cada foto, el navegador los usará.
//
// Uso:
//   node optimizar-imagenes.mjs                 -> usa ./public/Noticias
//   node optimizar-imagenes.mjs ruta/a/carpeta  -> usa la carpeta que le indiques
//   node optimizar-imagenes.mjs ./public/Noticias --force   -> regenera aunque ya exista
//
// Requisitos: Node 20 y el paquete "sharp" (npm i sharp).

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

// ---- Ajustes que puedes cambiar ----
const ANCHO_MAXIMO = 1920; // px. Cubre de sobra pantallas grandes y retina. No agranda imágenes pequeñas.
const CALIDAD = 85; // 0-100. 85 = alta calidad, visualmente casi idéntica al original.
                    // Si quieres aún más calidad puedes subir a 90 (pesará un poco más).
                    // Bajar a 75-80 reduce más el peso con una diferencia mínima a la vista.
const EXTENSIONES = [".jpg", ".jpeg", ".png"];
// ------------------------------------

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const carpeta = args.find((a) => !a.startsWith("--")) ?? "./public/Noticias";

let totalOriginal = 0;
let totalWebp = 0;
let convertidas = 0;
let saltadas = 0;
let errores = 0;

async function recorrer(dir) {
  let items;
  try {
    items = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    console.error(`No pude leer la carpeta: ${dir} -> ${e.message}`);
    return;
  }

  for (const item of items) {
    const ruta = path.join(dir, item.name);

    if (item.isDirectory()) {
      await recorrer(ruta);
      continue;
    }

    const ext = path.extname(item.name).toLowerCase();
    if (!EXTENSIONES.includes(ext)) continue;

    const salida = ruta.slice(0, -ext.length) + ".webp";

    try {
      const infoOrigen = await stat(ruta);

      // Si el .webp ya existe y es más nuevo que el original, lo saltamos
      // (a menos que se use --force).
      if (!FORCE) {
        try {
          const infoSalida = await stat(salida);
          if (infoSalida.mtimeMs >= infoOrigen.mtimeMs) {
            saltadas++;
            continue;
          }
        } catch {
          // El .webp no existe todavía: hay que crearlo.
        }
      }

      await sharp(ruta)
        .rotate() // respeta la orientación EXIF de la foto
        .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
        .webp({ quality: CALIDAD })
        .toFile(salida);

      const infoNueva = await stat(salida);
      totalOriginal += infoOrigen.size;
      totalWebp += infoNueva.size;
      convertidas++;

      const kbAntes = (infoOrigen.size / 1024).toFixed(0);
      const kbDespues = (infoNueva.size / 1024).toFixed(0);
      console.log(`OK  ${ruta}  (${kbAntes} kB -> ${kbDespues} kB)`);
    } catch (e) {
      errores++;
      console.error(`ERROR en ${ruta}: ${e.message}`);
    }
  }
}

console.log(`\nOptimizando imágenes en: ${path.resolve(carpeta)}\n`);
await recorrer(carpeta);

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log("\n----------------------------------------");
console.log(`Convertidas: ${convertidas}   Saltadas (ya estaban): ${saltadas}   Errores: ${errores}`);
if (convertidas > 0) {
  console.log(`Peso original de las convertidas: ${mb(totalOriginal)} MB`);
  console.log(`Peso nuevo en .webp:              ${mb(totalWebp)} MB`);
  console.log(`Ahorro:                           ${mb(totalOriginal - totalWebp)} MB`);
}
console.log("----------------------------------------\n");
