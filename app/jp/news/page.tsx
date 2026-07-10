import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

const REGION = "jp";

export const metadata: Metadata = {
  title: "最新情報 | Saiens",
  description: "Saiens の最新情報、イベント、製品レポート。",
};

export default function JpNewsPage() {
  const posts = getPosts(REGION);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-16 md:py-24">
      <header className="flex flex-col gap-3">
        <h1 className="font-(family-name:--font-jost) text-3xl tracking-tight md:text-4xl">
          最新情報
        </h1>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-(--dark-accent)">現在、記事はありません。</p>
      )}
    </main>
  );
}
