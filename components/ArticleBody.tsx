import "@/app/sqs-article.css";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";

interface ArticleBodyProps {
  html: string;
}

/**
 * Renders migrated Squarespace article body HTML (bodyHtml from
 * content/blog/**\/*.json). Layout is handled by app/sqs-article.css,
 * scoped under the .sqs-article-body class used here.
 *
 * bodyHtml is run through sanitizeArticleHtml() first to strip
 * Squarespace-runtime-only cruft (lazy-load data-src attributes, noscript
 * fallback blocks) that has no purpose in a static rebuild — see that
 * module's doc comment for why it's needed.
 */
export default function ArticleBody({ html }: ArticleBodyProps) {
  if (!html) return null;

  return (
    <div
      className="sqs-article-body"
      // eslint-disable-next-line react/no-danger -- trusted, pre-migrated local content
      dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(html) }}
    />
  );
}
