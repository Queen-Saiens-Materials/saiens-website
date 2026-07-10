// Collect every images.squarespace-cdn.com URL from archived HTML/JSON +
// sitemap, download the original-size file into public/images/, and write
// archive/asset-map.json mapping remote URL -> local path. Re-run safe.
import { mkdir, readdir, readFile, writeFile, access, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = 'public/images';
const CDN_RE = /https:\/\/images\.squarespace-cdn\.com\/[^\s"'<>\\)]+/g;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const exists = (p) => access(p).then(() => true, () => false);

function normalize(raw) {
  // Unescape JSON-escaped slashes/unicode, drop query (size params) & fragments.
  let u = raw.replaceAll('\\/', '/').replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  u = u.split('?')[0].split('#')[0];
  // Trim trailing punctuation picked up by the regex.
  u = u.replace(/[.,;:]+$/, '');
  return u;
}

function localPathFor(url) {
  const u = new URL(url);
  // Path like /content/v1/<siteid>/<unique>/<filename> — keep the last two
  // segments so names stay unique and readable.
  const segs = u.pathname.split('/').filter(Boolean);
  const tail = segs.slice(-2).map(decodeURIComponent);
  const safe = tail.map(s => s.replace(/[^\w.+-]+/g, '_')).join('/');
  return path.join(OUT_DIR, safe);
}

async function collectUrls() {
  const urls = new Set();
  const dirs = ['archive/html', 'archive/json'];
  for (const dir of dirs) {
    for (const f of await readdir(dir)) {
      const text = await readFile(path.join(dir, f), 'utf8');
      for (const m of text.matchAll(CDN_RE)) urls.add(normalize(m[0]));
    }
  }
  const sitemap = await readFile('archive/sitemap.xml', 'utf8');
  for (const m of sitemap.matchAll(CDN_RE)) urls.add(normalize(m[0]));
  return [...urls];
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  const urls = await collectUrls();
  console.log(`${urls.length} unique CDN assets`);
  const map = {};
  const errors = [];
  let done = 0, bytes = 0;
  const queue = [...urls];
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      const dest = localPathFor(url);
      map[url] = '/' + path.relative('public', dest);
      try {
        if (await exists(dest) && (await stat(dest)).size > 0) {
          done++;
        } else {
          bytes += await download(url, dest);
          done++;
        }
      } catch (err) {
        errors.push({ url, error: String(err) });
        delete map[url];
      }
      if (done % 25 === 0) console.log(`  ${done}/${urls.length}`);
    }
  }
  await Promise.all(Array.from({ length: 6 }, worker));
  await writeFile('archive/asset-map.json', JSON.stringify(map, null, 2));
  await writeFile('archive/asset-errors.json', JSON.stringify(errors, null, 2));
  console.log(`done: ${done} ok, ${errors.length} errors, ${(bytes / 1e6).toFixed(1)} MB new`);
  if (errors.length) process.exitCode = 1;
}

main();
