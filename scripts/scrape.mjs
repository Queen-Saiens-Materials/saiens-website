// Scrape saiens.group: for every sitemap URL, save full HTML and Squarespace
// structured JSON (?format=json) into archive/. Safe to re-run (skips existing).
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://www.saiens.group';
const OUT_HTML = 'archive/html';
const OUT_JSON = 'archive/json';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const exists = (p) => access(p).then(() => true, () => false);

const slugFor = (url) => {
  const p = new URL(url).pathname.replace(/\/+$/, '');
  return p === '' ? 'home' : p.slice(1).replaceAll('/', '__');
};

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function main() {
  await mkdir(OUT_HTML, { recursive: true });
  await mkdir(OUT_JSON, { recursive: true });

  const sitemap = await fetchText(`${BASE}/sitemap.xml`);
  await writeFile('archive/sitemap.xml', sitemap);
  const urls = [...new Set([...sitemap.matchAll(/<loc>(https:\/\/www\.saiens\.group[^<]*)<\/loc>/g)].map(m => m[1]))];
  // Root page is not always in the sitemap; include it explicitly.
  if (!urls.includes(`${BASE}/`)) urls.unshift(`${BASE}/`);
  console.log(`${urls.length} pages in sitemap`);

  const report = [];
  for (const url of urls) {
    const slug = slugFor(url);
    const htmlPath = path.join(OUT_HTML, `${slug}.html`);
    const jsonPath = path.join(OUT_JSON, `${slug}.json`);
    const entry = { url, slug, html: false, json: false, error: null };
    try {
      if (await exists(htmlPath)) {
        entry.html = 'cached';
      } else {
        await writeFile(htmlPath, await fetchText(url));
        entry.html = true;
      }
      if (await exists(jsonPath)) {
        entry.json = 'cached';
      } else {
        const raw = await fetchText(`${url}?format=json`);
        try {
          JSON.parse(raw);
          await writeFile(jsonPath, raw);
          entry.json = true;
        } catch {
          entry.json = 'not-json';
        }
      }
      console.log(`ok  ${slug}`);
    } catch (err) {
      entry.error = String(err);
      console.error(`ERR ${slug}: ${err}`);
    }
    report.push(entry);
    await new Promise(r => setTimeout(r, 300)); // be polite
  }
  await writeFile('archive/scrape-report.json', JSON.stringify(report, null, 2));
  const failed = report.filter(r => r.error);
  console.log(`done: ${report.length} pages, ${failed.length} errors`);
  if (failed.length) process.exitCode = 1;
}

main();
