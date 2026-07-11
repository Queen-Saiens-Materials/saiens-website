import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  region: string;
  originalUrl?: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  bodyHtml?: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

/**
 * Reads all blog post JSON files for a given region (e.g. "tw", "jp"),
 * sorted by date descending. Never throws — returns [] if the region
 * directory doesn't exist or files fail to parse.
 */
export function getPosts(region: string): BlogPost[] {
  const dir = path.join(CONTENT_ROOT, region);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".json"));

  const parsed = files
    .map((file) => ({ file, post: readPostFile(path.join(dir, file)) }))
    .filter(
      (entry): entry is { file: string; post: BlogPost } => entry.post !== null
    );

  const seenSlugs = new Map<string, string>();
  const posts: BlogPost[] = [];

  for (const { file, post } of parsed) {
    const existingFile = seenSlugs.get(post.slug);
    if (existingFile) {
      console.warn(
        `[lib/posts] Duplicate slug "${post.slug}" in region "${region}": ` +
          `"${file}" duplicates "${existingFile}". Keeping "${existingFile}", skipping "${file}".`
      );
      continue;
    }
    seenSlugs.set(post.slug, file);
    posts.push(post);
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Reads a single post by slug within a region. Returns null if not found
 * or unparsable — never throws.
 */
export function getPost(region: string, slug: string): BlogPost | null {
  const dir = path.join(CONTENT_ROOT, region);

  if (!fs.existsSync(dir)) {
    return null;
  }

  const directPath = path.join(dir, `${slug}.json`);
  if (fs.existsSync(directPath)) {
    const post = readPostFile(directPath);
    if (post) return post;
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".json"));
  for (const file of files) {
    const post = readPostFile(path.join(dir, file));
    if (post && post.slug === slug) {
      return post;
    }
  }

  return null;
}

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

function isValidCalendarDate(dateStr: string): boolean {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function readPostFile(filePath: string): BlogPost | null {
  const fileName = path.basename(filePath);
  let raw: string;

  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.warn(
      `[lib/posts] Failed to read "${fileName}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn(
      `[lib/posts] Malformed JSON in "${fileName}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }

  const missingFields = ["slug", "title", "date"].filter(
    (field) => !parsed[field]
  );
  if (missingFields.length > 0) {
    console.warn(
      `[lib/posts] Missing required field(s) [${missingFields.join(
        ", "
      )}] in "${fileName}".`
    );
    return null;
  }

  const date = String(parsed.date);
  if (!DATE_FORMAT.test(date) || !isValidCalendarDate(date)) {
    console.warn(
      `[lib/posts] Invalid date "${date}" in "${fileName}" (expected YYYY-MM-DD).`
    );
    return null;
  }

  return {
    slug: String(parsed.slug),
    region: (parsed.region as string) ?? "",
    originalUrl: parsed.originalUrl as string | undefined,
    title: String(parsed.title),
    date,
    excerpt: (parsed.excerpt as string) ?? "",
    thumbnail: (parsed.thumbnail as string) ?? "",
    bodyHtml: parsed.bodyHtml as string | undefined,
  };
}
