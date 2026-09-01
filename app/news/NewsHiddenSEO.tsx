import type { News } from "../../types/insights";

interface NewsHiddenSEOProps {
  allNews: News[];
}
export default function NewsHiddenSEO({ allNews }: NewsHiddenSEOProps) {
  return (
    <div className="sr-only" aria-hidden="true">
      {allNews.map((item) => (
        <article key={item.id} itemScope itemType="https://schema.org/NewsArticle">
          <h2 itemProp="headline">{item.title}</h2>
          <meta itemProp="datePublished" content={item.date} />
          {item.content_preview && (
            <p itemProp="description">{item.content_preview}</p>
          )}
          {item.tags && item.tags.map((tag) => (
            <meta key={tag} itemProp="keywords" content={tag} />
          ))}
          <a href={`/news/${item.code}`} itemProp="url">
            Read full article: {item.title}
          </a>
        </article>
      ))}
    </div>
  );
}