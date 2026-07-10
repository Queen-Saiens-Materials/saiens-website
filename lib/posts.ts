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

  const posts = files
    .map((file) => readPostFile(path.join(dir, file)))
    .filter((post): post is BlogPost => post !== null);

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

function readPostFile(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    if (!parsed.slug || !parsed.title || !parsed.date) {
      return null;
    }

    return {
      slug: parsed.slug,
      region: parsed.region ?? "",
      originalUrl: parsed.originalUrl,
      title: parsed.title,
      date: parsed.date,
      excerpt: parsed.excerpt ?? "",
      thumbnail: parsed.thumbnail ?? "",
      bodyHtml: parsed.bodyHtml,
    };
  } catch {
    return null;
  }
}
