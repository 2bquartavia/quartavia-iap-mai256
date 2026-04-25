/**
 * Gera AVIF + WebP + JPEG em 480 / 800 / 1280 px de largura a partir de src/assets.
 * Saída: public/images-lp/ (rota estática /images-lp/… no deploy).
 */
import sharp from "sharp";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const ASSETS = join(root, "src", "assets");
const OUT = join(root, "public", "images-lp");

const SOURCES = [
  "adrian-esposa.jpg",
  "profissional-diagnostico.png",
  "predio-alugueis.png",
];

const WIDTHS = [480, 800, 1280];

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function stem(filename) {
  return basename(filename, extname(filename));
}

async function processFile(filename) {
  const input = join(ASSETS, filename);
  if (!(await fileExists(input))) {
    console.warn(`[optimize-lp-images] skip (missing): ${input}`);
    return;
  }
  const name = stem(filename);
  for (const w of WIDTHS) {
    const base = await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true });

    const bufAvif = await base.clone().avif({ quality: 62, effort: 4 }).toBuffer();
    const bufWebp = await base.clone().webp({ quality: 78 }).toBuffer();
    const bufJpg = await base
      .clone()
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    await writeFile(join(OUT, `${name}-${w}.avif`), bufAvif);
    await writeFile(join(OUT, `${name}-${w}.webp`), bufWebp);
    await writeFile(join(OUT, `${name}-${w}.jpg`), bufJpg);
  }
  console.log(`[optimize-lp-images] ok: ${name} (${WIDTHS.join(", ")}w)`);
}

await mkdir(OUT, { recursive: true });

for (const f of SOURCES) {
  await processFile(f);
}
console.log("[optimize-lp-images] concluído.");
