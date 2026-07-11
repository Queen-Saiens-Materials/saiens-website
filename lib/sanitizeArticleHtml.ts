/**
 * Post-processes migrated Squarespace article body HTML (bodyHtml from
 * content/blog/**\/*.json) so it renders correctly without Squarespace's
 * runtime JS.
 *
 * Squarespace's original markup relies on client-side lazy-loading: <img>
 * tags carry `data-src` / `data-image` instead of a real `src` (Squarespace's
 * JS fills `src` in on scroll), and a `<noscript>` sibling holds a plain
 * `<img src="...">` as a no-JS fallback. Since our static rebuild has no such
 * runtime:
 *   - lazy-load `<img>` tags never get a `src`, so the browser renders them
 *     as zero/tiny broken-image boxes (causing the "images overlap and look
 *     tiny" symptom, compounded by the intrinsic-ratio CSS expecting a
 *     correctly sized image).
 *   - browsers with JavaScript enabled do NOT parse the contents of
 *     `<noscript>` as DOM — react's dangerouslySetInnerHTML puts the raw
 *     markup in the page, and the browsers treats everything inside
 *     `<noscript>` as opaque text, so the fallback `<img>` tag's attributes
 *     (including the filename in `alt`/`src`) get displayed as literal
 *     visible text, e.g. "IMG_4417.JPG" (the "leaked filenames" symptom).
 *
 * Fix: promote `data-src`/`data-image` to `src` on every `<img>` missing a
 * real `src`, then drop all `<noscript>` wrapper blocks (now redundant,
 * since the sibling `<img>` has a working `src`).
 */

const NOSCRIPT_BLOCK = /<noscript>[\s\S]*?<\/noscript>/gi;
const IMG_TAG = /<img\b[^>]*>/gi;
const SRC_ATTR = /\ssrc\s*=\s*["'][^"']*["']/i;
const DATA_SRC_ATTR = /\sdata-src\s*=\s*["']([^"']*)["']/i;
const DATA_IMAGE_ATTR = /\sdata-image\s*=\s*["']([^"']*)["']/i;

function promoteLazySrc(imgTag: string): string {
  if (SRC_ATTR.test(imgTag)) {
    return imgTag;
  }

  const dataSrc = imgTag.match(DATA_SRC_ATTR)?.[1];
  const dataImage = imgTag.match(DATA_IMAGE_ATTR)?.[1];
  const realSrc = dataSrc || dataImage;

  if (!realSrc) {
    return imgTag;
  }

  return imgTag.replace(/^<img\b/i, `<img src="${realSrc}"`);
}

/**
 * Sanitizes a migrated Squarespace bodyHtml string for static rendering.
 * Safe to call on our own pre-extracted local content (not untrusted
 * user input).
 */
export function sanitizeArticleHtml(html: string): string {
  if (!html) return html;

  return html
    .replace(NOSCRIPT_BLOCK, "")
    .replace(IMG_TAG, promoteLazySrc);
}
