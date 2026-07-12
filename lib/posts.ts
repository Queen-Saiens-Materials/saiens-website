import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  region: string;
  originalUrl?: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  body?: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

/**
 * Reads all blog post MDX files for a given region (e.g. "tw", "jp"),
 * sorted by date descending. Never throws — returns [] if the region
 * directory doesn't exist or files fail to parse.
 */
export function getPosts(region: string): BlogPost[] {
  const dir = path.join(CONTENT_ROOT, region);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

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

  const directPath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(directPath)) {
    const post = readPostFile(directPath);
    if (post) return post;
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
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
  const slug = fileName.replace(/\.mdx$/, "");
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

  let data: Record<string, unknown>;
  let content: string;
  try {
    const parsed = matter(raw);
    data = parsed.data;
    content = parsed.content;
  } catch (error) {
    console.warn(
      `[lib/posts] Malformed frontmatter in "${fileName}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }

  const missingFields = ["title", "date"].filter((field) => !data[field]);
  if (missingFields.length > 0) {
    console.warn(
      `[lib/posts] Missing required field(s) [${missingFields.join(
        ", "
      )}] in "${fileName}".`
    );
    return null;
  }

  const date = String(data.date);
  if (!DATE_FORMAT.test(date) || !isValidCalendarDate(date)) {
    console.warn(
      `[lib/posts] Invalid date "${date}" in "${fileName}" (expected YYYY-MM-DD).`
    );
    return null;
  }

  const region = path.basename(path.dirname(filePath));

  return {
    slug,
    region,
    originalUrl: data.originalUrl as string | undefined,
    title: String(data.title),
    date,
    excerpt: (data.excerpt as string) ?? "",
    thumbnail: (data.thumbnail as string) ?? "",
    body: content.trim(),
  };
}
