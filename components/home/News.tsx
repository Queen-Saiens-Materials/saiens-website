import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/posts";

export default function News() {
  const posts = getPosts("tw");

  return (
    <section id="news" className="bg-(--black) px-6 py-24 text-(--light-accent) sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-(family-name:--font-jost) text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          What&rsquo;s New,
          <span className="mt-2 block text-lg font-normal text-(--accent)">
            What&rsquo;s Beautiful
          </span>
        </h2>
        <p className="mt-4 text-center text-sm text-(--dark-accent)">
          最新的消息，也是最美的祝福
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
