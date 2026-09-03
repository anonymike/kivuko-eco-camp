#!/usr/bin/env node
/**
 * One-time local generator for responsive WebP derivatives.
 *
 * Reads the authentic source JPEGs in src/assets/images and writes
 * width-suffixed WebP copies next to them (e.g. camp-tents-exterior-rock-1920.webp).
 * Originals are never modified — they remain the source/reference assets.
 * Derivatives are committed to the repo and referenced from the frontend
 * via <img srcSet>/sizes; no build-time processing is involved.
 *
 * Usage:
 *   npm install --no-save sharp   # once; not added to package.json
 *   node scripts/generate-webp.mjs
 *
 * Widths are chosen per photograph from real layout usage, not generated
 * blindly:
 *   - "Hero-tier" photos appear full-viewport / full-bleed somewhere
 *     (cinematic hero, PageHero, full-bleed feature sections) and are also
 *     used in card grids, so they get 768 / 1200 / 1600 / 1920.
 *   - "Content-tier" photos never render wider than ~half the container,
 *     so they cap at 1200 (480 / 768 / 1200).
 *   - experience-bush-walk-guide.jpg is only 1086px wide natively — it is
 *     never upscaled past its source width.
 *
 * Quality 78 preserves photographic detail at a fraction of the bytes.
 * Re-runnable: existing derivatives are skipped when newer than their source.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMG_DIR = path.join(process.cwd(), "src", "assets", "images");
const QUALITY = 78;

/** basename (without extension) -> target widths, in ascending order. */
const WIDTHS = {
  // Hero-tier (full-bleed hero / cinematic / detail hero + card reuse)
  "camp-tents-exterior-rock": [768, 1200, 1600, 1920],
  "dining-pavilion-exterior": [768, 1200, 1600, 1920],
  "dining-pavilion-interior-rock": [768, 1200, 1600, 1920],
  "dining-rock-overhang-table": [768, 1200, 1600, 1920],
  "dining-area-tables": [768, 1200, 1600, 1920],
  "stay-twin-tent-interior": [768, 1200, 1600, 1920],
  "wildlife-agama-lizard": [480, 768, 1200, 1600, 1920],
  // Experience page hero source is only 1086px wide — cap at native width.
  "experience-bush-walk-guide": [480, 768, 1086],
  // Content-tier (never wider than ~half container / card / gallery)
  "stay-bathroom-ensuite": [480, 768, 1200],
  "dining-breakfast-table": [480, 768, 1200],
  "dining-breakfast-plate": [480, 768, 1200],
};

async function main() {
  const sources = await fs.readdir(IMG_DIR);
  const jpgNames = new Set(
    sources.filter((f) => /\.jpe?g$/i.test(f)).map((f) => f.replace(/\.jpe?g$/i, ""))
  );

  const missing = Object.keys(WIDTHS).filter((name) => !jpgNames.has(name));
  if (missing.length) {
    console.error(`Config references missing sources: ${missing.join(", ")}`);
    process.exit(1);
  }

  console.log("Generating WebP derivatives (quality " + QUALITY + ")…\n");
  const rows = [];
  let totalSrc = 0;
  let totalWebp = 0;

  for (const [name, widths] of Object.entries(WIDTHS)) {
    const srcPath = path.join(IMG_DIR, `${name}.jpg`);
    const srcStat = await fs.stat(srcPath);
    totalSrc += srcStat.size;

    for (const width of widths) {
      const outPath = path.join(IMG_DIR, `${name}-${width}.webp`);
      try {
        const stat = await fs.stat(outPath);
        if (stat.mtimeMs >= srcStat.mtimeMs) {
          rows.push([`${name}-${width}.webp`, stat.size, "skipped (up to date)"]);
          totalWebp += stat.size;
          continue;
        }
      } catch {
        /* derivative doesn't exist yet */
      }

      await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      const stat = await fs.stat(outPath);
      rows.push([`${name}-${width}.webp`, stat.size, ""]);
      totalWebp += stat.size;
    }
  }

  const cols = [32, 12, 24];
  const line = (cells) => cells.map((c, i) => c.padEnd(cols[i])).join("");
  console.log(line(["file", "bytes", "note"]));
  console.log("-".repeat(cols.reduce((a, b) => a + b, 0)));
  for (const [file, bytes, note] of rows) {
    console.log(line([file, String(bytes), note]));
  }
  console.log("\nTotal source JPEGs: " + totalSrc + " bytes");
  console.log("Total WebP derivatives: " + totalWebp + " bytes");
  console.log(
    "Reduction across generated set: " +
      (((totalSrc - totalWebp) / totalSrc) * 100).toFixed(1) +
      "%"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
