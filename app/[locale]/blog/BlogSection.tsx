"use client";

import Image from "next/image";
import {useMemo, useState, useEffect, type ReactNode} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {BlogArticles, type BlogArticle} from "./BlogArticles";
import {BlogFilters} from "./BlogFilters";

const ARTICLES_PER_PAGE = 4;

export function BlogSection({
  locale,
  featuredArticle,
  articles,
  filters,
  placeholder,
  noResultsText,
  featuredTag,
  detailLabel,
  prevPageLabel,
  nextPageLabel,
  sidebarChildren,
}: {
  locale: Locale;
  featuredArticle: BlogArticle;
  articles: BlogArticle[];
  filters: readonly {id: string; label: string}[];
  placeholder: string;
  noResultsText: string;
  featuredTag: string;
  detailLabel: string;
  prevPageLabel: string;
  nextPageLabel: string;
  sidebarChildren?: ReactNode;
}) {
  const defaultFilter = filters[0]?.id ?? "blogFilterAll";
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [randomFeaturedArticle, setRandomFeaturedArticle] = useState<BlogArticle | null>(null);

  // Random featured article - only on client side
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    setRandomFeaturedArticle(articles[randomIndex] || featuredArticle);
  }, [articles, featuredArticle]);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesFilter =
          selectedFilter === "blogFilterAll" || article.filter === selectedFilter;
        const matchesQuery =
          query.trim().length === 0 ||
          [article.title, article.summary, article.category, article.details]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        return matchesFilter && matchesQuery;
      }),
    [articles, selectedFilter, query]
  );

  // Only show the featured hero while browsing the default, unfiltered view -
  // as soon as the visitor filters or searches, the list should reflect that directly.
  const showFeatured = selectedFilter === defaultFilter && query.trim().length === 0;

  const listArticles = showFeatured
    ? filteredArticles.filter(
        (article) => article.id !== (randomFeaturedArticle?.id || featuredArticle.id)
      )
    : filteredArticles;

  const totalPages = Math.ceil(listArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = listArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleFilterChange = (id: string) => {
    setSelectedFilter(id);
    setCurrentPage(1);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="space-y-8">
        {showFeatured && randomFeaturedArticle && (
          <Link
            href={`/blog/${randomFeaturedArticle.id}`}
            locale={locale}
            className="group block overflow-hidden rounded-[1.5rem] bg-white shadow-[0_25px_80px_rgba(17,17,20,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(17,17,20,0.15)]"
          >
            <div className="relative h-[420px] overflow-hidden bg-[#f5f3f0]">
              <Image
                src={randomFeaturedArticle.imageSrc}
                alt={randomFeaturedArticle.title}
                fill
                priority
                loading="eager"
                sizes="100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                  {featuredTag}
                </span>
                <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
                  {randomFeaturedArticle.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                  {randomFeaturedArticle.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                    {randomFeaturedArticle.category}
                  </span>
                  <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition group-hover:bg-white/20">
                    {randomFeaturedArticle.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <BlogArticles
          articles={paginatedArticles}
          locale={locale}
          noResultsText={noResultsText}
          detailLabel={detailLabel}
        />

        {totalPages > 1 && listArticles.length > 0 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full border border-ink/10 p-2.5 text-ink transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:text-accent"
              aria-label={prevPageLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-accent text-white"
                      : "border border-ink/10 text-ink hover:border-accent hover:text-accent"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full border border-ink/10 p-2.5 text-ink transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:text-accent"
              aria-label={nextPageLabel}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <aside className="space-y-8">
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_12px_30px_rgba(17,17,20,0.08)]">
          <BlogFilters
            items={filters}
            placeholder={placeholder}
            selected={selectedFilter}
            onSelect={handleFilterChange}
            query={query}
            onQueryChange={handleQueryChange}
          />
        </div>

        {sidebarChildren}
      </aside>
    </>
  );
}
