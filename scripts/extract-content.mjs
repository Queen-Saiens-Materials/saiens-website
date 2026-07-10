// Extract blog posts from archive/json item pages into content/blog/<region>/
// as JSON files: { slug, title, date, excerpt, thumbnail, bodyHtml } with all
// squarespace-cdn image URLs rewritten to local /images/ paths.
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assetMap = JSON.parse(await readFile('archive/asset-map.json', 'utf8'));

const REGION_OF = { top: 'tw', 'top-jp': 'jp', usa: 'usa' };
const CDN_RE = /https:\/\/images\.squarespace-cdn\.com\/[^\s"'<>\\)]+/g;

function localize(html) {
  return html.replace(CDN_RE, (m) => {
    const clean = m.replaceAll('\\/', '/').split('?')[0].replace(/[.,;:]+$/, '');
    return assetMap[clean] ?? m;
  });
}

await mkdir('content/blog', { recursive: true });
const files = (await readdir('archive/json')).filter(f => f.includes('__'));
let count = 0;
for (const f of files) {
  const [collection] = f.split('__');
  const region = REGION_OF[collection];
  if (!region) continue;
  const j = JSON.parse(await readFile(path.join('archive/json', f), 'utf8'));
  const it = j.item;
  if (!it) { console.warn(`skip ${f}: no item`); continue; }
  const slug = it.urlId.split('/').pop();
  const out = {
    slug,
    region,
    originalUrl: it.fullUrl,
    title: it.title,
    date: new Date(it.publishOn).toISOString().slice(0, 10),
    excerpt: localize(it.excerpt ?? ''),
    thumbnail: it.assetUrl ? localize(it.assetUrl) : null,
    bodyHtml: localize(it.body ?? ''),
  };
  const dir = path.join('content/blog', region);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${slug}.json`), JSON.stringify(out, null, 2));
  count++;
  console.log(`${region}/${slug}  ${out.title}`);
}
console.log(`${count} posts extracted`);
