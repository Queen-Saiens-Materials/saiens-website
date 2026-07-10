import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/posts";
import ArticleBody from "@/components/ArticleBody";

const REGION = "tw";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("zh-Hant-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams(): PageParams[] {
  return getPosts(REGION).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(REGION, slug);

  if (!post) {
    return { title: "找不到文章 | Saiens" };
  }

  const description = stripHtml(post.excerpt);

  return {
    title: `${post.title} | Saiens`,
    description,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(REGION, slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16 md:py-24">
      <Link
        href="/news"
        className="text-sm text-(--dark-accent) transition-colors hover:text-(--foreground)"
      >
        ← 返回消息列表
      </Link>

      <header className="flex flex-col gap-3 border-b border-(--accent) pb-8">
        <time
          dateTime={post.date}
          className="text-xs uppercase tracking-wide text-(--dark-accent)"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="font-(family-name:--font-jost) text-3xl leading-tight tracking-tight md:text-4xl">
          {post.title}
        </h1>
      </header>

      <ArticleBody html={post.bodyHtml ?? ""} />
    </main>
  );
}
