import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export type BlogArticle = {
  id: string;
  slug: string;
  category: string;
  filter: string;
  title: string;
  summary: string;
  details: string;
  readTime: string;
  imageSrc: string;
};

type BlogArticlesProps = {
  articles: BlogArticle[];
  locale: Locale;
  noResultsText?: string;
  detailLabel: string;
};

export function BlogArticles({articles, locale, noResultsText, detailLabel}: BlogArticlesProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-ink/10 bg-white p-10 text-center text-sm text-ink/70">
        {noResultsText ?? "No articles found for this category."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/blog/${article.filter}/${article.slug}`}
          locale={locale}
          className="group flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(17,17,20,0.08)] sm:flex-row"
        >
          <div className="relative h-52 w-full flex-shrink-0 overflow-hidden bg-[#f5f3f0] sm:h-auto sm:w-64">
            <Image
              src={article.imageSrc}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4 p-6 text-left">
            <div>
              <span className="inline-flex rounded-full bg-[#f0f0ff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                {article.category}
              </span>
              <h3 className="mt-3 text-xl font-black text-ink">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{article.summary}</p>
            </div>
            <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-xs uppercase tracking-[0.24em] text-ink/60">
              <span>{article.readTime}</span>
              <span className="flex items-center gap-1 text-accent">
                {detailLabel}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 transition group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
