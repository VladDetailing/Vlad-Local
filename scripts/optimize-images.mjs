import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, 'Public');
const optimizedRoot = path.join(publicDir, 'optimized');
const includeDirs = [
  path.join(publicDir, 'Images'),
  path.join(publicDir, 'Polish'),
  path.join(publicDir, 'Retapitari'),
  path.join(publicDir, 'Revopsire-piele')
];
const exts = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);
const widths = [480, 768, 1080, 1440];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(p);
    } else if (e.isFile()) {
      yield p;
    }
  }
}

async function processImage(absPath) {
  const ext = path.extname(absPath);
  if (!exts.has(ext)) return;
  const rel = path.relative(publicDir, absPath);
  const baseNoExt = rel.slice(0, -ext.length);
  const srcBuf = await fs.readFile(absPath);
  const img = sharp(srcBuf, { limitInputPixels: false });
  const meta = await img.metadata();
  const origW = meta.width ?? 0;
  const targetWidths = widths.filter((w) => w <= origW && w >= 320);
  if (targetWidths.length === 0) {
    targetWidths.push(Math.min(480, origW || 480));
  }
  for (const w of targetWidths) {
    const outDir = path.join(optimizedRoot, path.dirname(baseNoExt));
    await ensureDir(outDir);
    const outWebp = path.join(optimizedRoot, `${baseNoExt}-w${w}.webp`);
    const outAvif = path.join(optimizedRoot, `${baseNoExt}-w${w}.avif`);
    try {
      await fs.access(outWebp);
    } catch {
      const buf = await img.resize({ width: w }).webp({ quality: 70 }).toBuffer();
      await fs.writeFile(outWebp, buf);
    }
    try {
      await fs.access(outAvif);
    } catch {
      const buf2 = await img.resize({ width: w }).avif({ quality: 50 }).toBuffer();
      await fs.writeFile(outAvif, buf2);
    }
  }
}

async function main() {
  await ensureDir(optimizedRoot);
  for (const d of includeDirs) {
    try {
      for await (const p of walk(d)) {
        await processImage(p);
      }
    } catch {
      // ignore missing dirs
    }
  }
  process.stdout.write('Images optimized to Public/optimized\n');
}

await main();
