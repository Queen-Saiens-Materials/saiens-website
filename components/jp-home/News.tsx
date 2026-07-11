import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

interface NewsProps {
  posts: BlogPost[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDateJa(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface JpBlogCardProps {
  post: BlogPost;
}

function JpBlogCard({ post }: JpBlogCardProps): React.JSX.Element {
  const { slug, title, date, excerpt, thumbnail } = post;

  return (
    <Link
      href={`/jp/news/${slug}`}
      className="group flex flex-col gap-4 text-inherit no-underline"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--light-accent)">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <time className="text-xs uppercase tracking-wide text-(--dark-accent)">
          {formatDateJa(date)}
        </time>
        <h3 className="font-(family-name:--font-jost) text-lg leading-snug tracking-tight">
          {title}
        </h3>
        {excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-(--dark-accent)">
            {stripHtml(excerpt)}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export default function News({ posts }: NewsProps): React.JSX.Element {
  return (
    <section id="news" className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-24 sm:px-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-(family-name:--font-jost) text-3xl tracking-tight sm:text-4xl">
          <strong>
            新しい発見、
            <br />
            美しい暮らし。
          </strong>
        </h1>
        <h4 className="text-lg text-(--dark-accent)">
          <strong>– 最新の情報、そして美しい祝福。</strong>
        </h4>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <JpBlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-(--dark-accent)">
          最新情報は近日公開予定です。
        </p>
      )}
    </section>
  );
}
