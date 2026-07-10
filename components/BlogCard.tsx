import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

export type { BlogPost };

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("zh-Hant", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const { slug, title, date, excerpt, thumbnail } = post;

  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col gap-4 text-inherit no-underline"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-(--light-accent)">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <time className="text-xs uppercase tracking-wide text-(--dark-accent)">
          {formatDate(date)}
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
