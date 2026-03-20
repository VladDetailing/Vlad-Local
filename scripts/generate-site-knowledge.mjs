import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd());
const srcDir = path.join(projectRoot, 'src');
const outFile = path.join(projectRoot, 'src', 'components', 'siteKnowledge.generated.ts');

function normalizeText(input) {
  return String(input).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function looksLikeNoise(s) {
  const t = s.trim();
  if (!t) return true;
  if (t.length < 3) return true;
  if (/^(\/|#|https?:\/\/|tel:|mailto:)/i.test(t)) return true;
  if (t.startsWith('./') || t.startsWith('../')) return true;
  if (/[{}$<>]/.test(t)) return true;
  if (/^\d+$/.test(t)) return true;

  const lowered = t.toLowerCase();
  if (
    [
      'button',
      'submit',
      'meta',
      'property',
      'content',
      'name',
      'href',
      'link',
      'async',
      'auto',
      'scroll',
      'smooth',
      'start',
      'lazy',
      'none',
      'anonymous',
      'noopener',
      'noreferrer',
      '_blank',
      'currentcolor',
      'round',
      'user',
      'assistant',
      'react',
      'lucide-react',
      'framer-motion',
      'typescript',
      'eslint',
      'vite'
    ].includes(lowered)
  )
    return true;

  if (
    /^(bg-|text-|border-|hover:|md:|lg:|sm:|px-|py-|pt-|pb-|pl-|pr-|w-|h-|rounded|min-h|max-w|mx-|my-|gap-|items-|justify-|absolute|relative|fixed|z-\[|opacity|translate|container|font-|shadow|transition|backdrop|tracking|uppercase)/i.test(
      t
    )
  )
    return true;

  if (/^(m[trblxy]-|p[trblxy]-|top-|bottom-|left-|right-)/i.test(t)) return true;

  const tailwindish = t.match(
    /\b(bg-|text-|border-|hover:|md:|lg:|sm:|px-|py-|pt-|pb-|pl-|pr-|w-|h-|rounded|shadow|flex|grid|min-h|max-w|mx-|my-|gap-|items-|justify-|absolute|relative|fixed|z-\[|opacity|translate|container|font-|tracking|uppercase|backdrop|transition)/g
  );
  if (tailwindish && tailwindish.length >= 3) return true;

  if (t.includes('className=')) return true;
  if (t.includes('(null)') || t.includes('useState') || t.includes('useEffect') || t.includes('return (')) return true;

  return false;
}

function cleanExtracted(raw) {
  const s = normalizeText(raw);
  if (looksLikeNoise(s)) return null;
  if (!/[a-zA-ZăâîșțĂÂÎȘȚ]/.test(s)) return null;
  if (s.length < 4) return null;
  return s.length > 1400 ? s.slice(0, 1400) : s;
}

function extractQuotedStrings(content) {
  const out = [];
  const quotePatterns = [
    /'([^'\\]*(?:\\.[^'\\]*)*)'/g,
    /"([^"\\]*(?:\\.[^"\\]*)*)"/g
  ];
  for (const re of quotePatterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(content))) out.push(m[1]);
  }
  const tpl = /`([^`]*?)`/g;
  tpl.lastIndex = 0;
  let tm;
  while ((tm = tpl.exec(content))) {
    if (tm[1].includes('${')) continue;
    out.push(tm[1]);
  }
  return out;
}

function extractJsxText(content) {
  const out = [];
  const re = />([^<]{3,}?)</g;
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(content))) out.push(m[1]);
  return out;
}

async function listFilesRecursive(dir, exts) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
      out.push(...(await listFilesRecursive(p, exts)));
      continue;
    }
    if (!e.isFile()) continue;
    if (!exts.has(path.extname(e.name))) continue;
    out.push(p);
  }
  return out;
}

function chunkText(text, maxLen = 1900) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const chunks = [];
  let buf = '';
  for (const line of lines) {
    if (!buf) {
      buf = line;
      continue;
    }
    if ((buf + '\n' + line).length > maxLen) {
      chunks.push(buf);
      buf = line;
      continue;
    }
    buf += '\n' + line;
  }
  if (buf) chunks.push(buf);
  return chunks;
}

function toId(p) {
  const rel = path.relative(projectRoot, p).replace(/\\/g, '/');
  return rel.replace(/[^a-zA-Z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

async function buildDocs() {
  const docs = [];

  const files = await listFilesRecursive(srcDir, new Set(['.ts', '.tsx']));
  for (const p of files) {
    const content = await fs.readFile(p, 'utf8');
    const extracted = [...extractQuotedStrings(content), ...extractJsxText(content)]
      .map(cleanExtracted)
      .filter(Boolean);
    if (!extracted.length) continue;
    const unique = Array.from(new Set(extracted));
    const combined = unique.join('\n');
    const chunks = chunkText(combined);
    chunks.forEach((c, idx) => docs.push({ id: `${toId(p)}-${idx + 1}`, title: path.relative(projectRoot, p), text: c }));
  }

  const indexPath = path.join(projectRoot, 'index.html');
  try {
    const html = await fs.readFile(indexPath, 'utf8');
    const extracted = [...extractQuotedStrings(html), ...extractJsxText(html)].map(cleanExtracted).filter(Boolean);
    const unique = Array.from(new Set(extracted));
    const combined = unique.join('\n');
    const chunks = chunkText(combined);
    chunks.forEach((c, idx) => docs.push({ id: `${toId(indexPath)}-${idx + 1}`, title: 'index.html', text: c }));
  } catch {
    // ignore
  }

  const seen = new Set();
  const deduped = [];
  for (const d of docs) {
    const key = `${d.title}\n${d.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(d);
  }
  return deduped;
}

async function main() {
  const docs = await buildDocs();
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  const content = `export type SiteKnowledgeDoc = { id: string; title: string; text: string };\n\nexport const siteKnowledgeDocs: SiteKnowledgeDoc[] = ${JSON.stringify(
    docs,
    null,
    2
  )};\n`;
  await fs.writeFile(outFile, content, 'utf8');
  process.stdout.write(`Generated ${docs.length} docs -> ${path.relative(projectRoot, outFile)}\n`);
}

await main();
