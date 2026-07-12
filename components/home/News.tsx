import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/posts";
import content from "@/content/pages/home-tw.json";

export default function News() {
  const posts = getPosts("tw");
  const { headingLine1, headingLine2, subhead } = content.news;

  return (
    <section id="news" className="bg-(--white) px-6 py-24 text-(--black) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingLine1}
          <span className="mt-2 block text-lg font-normal text-(--dark-accent)">
            {headingLine2}
          </span>
        </h2>
        <p className="mt-4 text-center text-sm text-(--dark-accent)">
          {subhead}
        </p>

        {posts.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
