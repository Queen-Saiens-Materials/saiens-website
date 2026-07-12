import "@/app/sqs-article.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleBodyProps {
  markdown: string;
}

/**
 * Renders migrated blog article bodies (content/blog/**\/*.mdx, converted
 * from the original Squarespace bodyHtml by scripts/convert-posts-to-mdx.mjs).
 * Layout/typography is handled by app/sqs-article.css, scoped under the
 * .sqs-article-body class used here — the row/col/gallery-grid rules in
 * that file are now inert (the source markup no longer has those classes
 * post-conversion) but the paragraph/heading/image/blockquote rules still
 * apply to react-markdown's plain output.
 */
export default function ArticleBody({ markdown }: ArticleBodyProps) {
  if (!markdown) return null;

  return (
    <div className="sqs-article-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
