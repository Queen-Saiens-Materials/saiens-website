import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/posts";
import content from "@/content/pages/home-jp.json";

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
  const { headingLine1, headingLine2, subhead, emptyStateText } = content.news;

  return (
    <section id="news" className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            {headingLine1}
            <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
              {headingLine2}
            </span>
          </h2>
          <p className="text-center text-sm text-(--dark-accent)">
            {subhead}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JpBlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-(--dark-accent)">
            {emptyStateText}
          </p>
        )}
      </div>
    </section>
  );
}
