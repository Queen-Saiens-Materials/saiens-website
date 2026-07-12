#!/usr/bin/env node
/**
 * One-off migration script: converts content/blog/{tw,jp}/*.json
 * (Squarespace-exported bodyHtml) into TinaCMS-compatible .mdx files
 * with frontmatter (title/date/excerpt/thumbnail/originalUrl) and a
 * Markdown body.
 *
 * Original .json files are moved (not deleted) to
 * content/blog/_legacy/<region>/ as a backup.
 *
 * Usage: node scripts/convert-posts-to-mdx.mjs
 */
import fs from "fs";
import path from "path";
import TurndownService from "turndown";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");
const REGIONS = ["tw", "jp"];

const NOSCRIPT_BLOCK = /<noscript>[\s\S]*?<\/noscript>/gi;
const IMG_TAG = /<img\b[^>]*>/gi;
const SRC_ATTR = /\ssrc\s*=\s*["'][^"']*["']/i;
const DATA_SRC_ATTR = /\sdata-src\s*=\s*["']([^"']*)["']/i;
const DATA_IMAGE_ATTR = /\sdata-image\s*=\s*["']([^"']*)["']/i;

/** Same lazy-load promotion logic as lib/sanitizeArticleHtml.ts, applied
 * pre-conversion so turndown sees real `src` attributes on every <img>. */
function promoteLazySrc(imgTag) {
  if (SRC_ATTR.test(imgTag)) return imgTag;
  const dataSrc = imgTag.match(DATA_SRC_ATTR)?.[1];
  const dataImage = imgTag.match(DATA_IMAGE_ATTR)?.[1];
  const realSrc = dataSrc || dataImage;
  if (!realSrc) return imgTag;
  return imgTag.replace(/^<img\b/i, `<img src="${realSrc}"`);
}

function sanitizeHtml(html) {
  if (!html) return html;
  return html.replace(NOSCRIPT_BLOCK, "").replace(IMG_TAG, promoteLazySrc);
}

function hasClass(node, className) {
  const cls = node.getAttribute && node.getAttribute("class");
  return typeof cls === "string" && cls.split(/\s+/).includes(className);
}

function createTurndownService() {
  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  // Squarespace slideshow galleries export a duplicate thumbnail-strip
  // nav (`.sqs-gallery-thumbnails`) alongside the real slides, meant to
  // be driven by client-side JS. Left in, it doubles every gallery
  // image in the Markdown output. Drop it - the main `.sqs-gallery`
  // slides already carry every photo, one per line.
  td.addRule("drop-gallery-thumbnail-strip", {
    filter: (node) => hasClass(node, "sqs-gallery-thumbnails"),
    replacement: () => "",
  });

  // Prev/next slideshow control buttons carry no text content but can
  // leave stray blank anchors; drop explicitly for clarity.
  td.addRule("drop-gallery-controls", {
    filter: (node) => hasClass(node, "sqs-gallery-controls"),
    replacement: () => "",
  });

  // Per-block Squarespace <style> tags (scoped CSS custom-property
  // overrides, e.g. "#block-xyz { --tweak-text-block-padding: ... }")
  // carry no visual meaning in the new static Markdown render and were
  // leaking into the body as literal text. Drop entirely.
  td.remove(["style", "script"]);

  // Squarespace occasionally wraps a normal paragraph in <pre><code>
  // (see app/sqs-article.css's .sqs-article-body pre comment for why -
  // the source site overrides `white-space: pre-wrap` so it *displays*
  // as flowing prose, not a code block). Render it as plain paragraph
  // text instead of turndown's default fenced code block, matching how
  // the original HTML actually renders.
  td.addRule("sqs-pre-as-paragraph", {
    filter: "pre",
    replacement: (_content, node) => {
      const text = node.textContent.trim();
      return text ? `\n\n${text}\n\n` : "";
    },
  });

  return td;
}

function htmlToMarkdown(td, html) {
  const sanitized = sanitizeHtml(html);
  const md = td.turndown(sanitized);
  // Collapse 3+ blank lines left behind by dropped blocks.
  return md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function stripHtmlToText(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function yamlEscape(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildFrontmatter(post) {
  const lines = ["---"];
  lines.push(`title: "${yamlEscape(post.title)}"`);
  lines.push(`date: "${post.date}"`);
  lines.push(`excerpt: "${yamlEscape(stripHtmlToText(post.excerpt))}"`);
  lines.push(`thumbnail: "${yamlEscape(post.thumbnail ?? "")}"`);
  if (post.originalUrl) {
    lines.push(`originalUrl: "${yamlEscape(post.originalUrl)}"`);
  }
  lines.push("---");
  return lines.join("\n");
}

function convertRegion(region, td) {
  const dir = path.join(CONTENT_ROOT, region);
  const legacyDir = path.join(CONTENT_ROOT, "_legacy", region);
  fs.mkdirSync(legacyDir, { recursive: true });

  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const report = [];

  for (const file of files) {
    const jsonPath = path.join(dir, file);
    const post = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const body = htmlToMarkdown(td, post.bodyHtml ?? "");
    const frontmatter = buildFrontmatter(post);
    const mdx = `${frontmatter}\n\n${body}`;

    const mdxPath = path.join(dir, `${post.slug}.mdx`);
    fs.writeFileSync(mdxPath, mdx, "utf-8");

    const legacyPath = path.join(legacyDir, file);
    fs.renameSync(jsonPath, legacyPath);

    const imageCount = (body.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length;
    report.push({ region, slug: post.slug, mdxPath, imageCount });
  }

  return report;
}

function main() {
  const td = createTurndownService();
  const report = REGIONS.flatMap((region) => convertRegion(region, td));
  for (const entry of report) {
    console.log(
      `[convert] ${entry.region}/${entry.slug} -> ${path.relative(
        process.cwd(),
        entry.mdxPath
      )} (${entry.imageCount} images)`
    );
  }
  console.log(`\nConverted ${report.length} posts.`);
}

main();
