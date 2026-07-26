"use client";

import Image from "next/image";
import {useMemo, useState, useEffect} from "react";
import {ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
import {BlogArticles, type BlogArticle} from "./BlogArticles";
import {BlogFilters} from "./BlogFilters";

const ARTICLES_PER_PAGE = 4;

export function BlogSection({
  featuredArticle,
  articles,
  filters,
  placeholder,
  noResultsText,
}: {
  featuredArticle: BlogArticle;
  articles: BlogArticle[];
  filters: readonly {id: string; label: string}[];
  placeholder: string;
  noResultsText: string;
}) {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.id ?? "blogFilterAll");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const otherArticles = filteredArticles.filter(
    (article) => article.id !== (randomFeaturedArticle?.id || featuredArticle.id)
  );
  
  const totalPages = Math.ceil(otherArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = otherArticles.slice(
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
    <div className="space-y-8">
      <BlogFilters
        items={filters}
        placeholder={placeholder}
        selected={selectedFilter}
        onSelect={handleFilterChange}
        query={query}
        onQueryChange={handleQueryChange}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {randomFeaturedArticle && (
          <button
            type="button"
            onClick={() => setActiveId(randomFeaturedArticle.id)}
            className="group lg:col-span-1 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_25px_80px_rgba(17,17,20,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(17,17,20,0.15)]"
          >
            <div className="relative h-[420px] overflow-hidden bg-[#f5f3f0]">
              <Image
                src={randomFeaturedArticle.imageSrc}
                alt={randomFeaturedArticle.title}
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                  ÖNE ÇIKAN
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
          </button>
        )}

        <div className="space-y-6">
          {paginatedArticles.slice(0, 2).map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setActiveId(article.id)}
              className="group w-full overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_30px_rgba(17,17,20,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(17,17,20,0.12)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#f5f3f0] md:flex md:h-auto">
                <div className="relative h-48 w-full md:h-auto md:w-40 flex-shrink-0 overflow-hidden bg-[#f5f3f0]">
                  <Image
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 text-left">
                  <div>
                    <span className="inline-block rounded-full bg-[#f0f0ff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-xl font-black text-ink leading-tight">{article.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink/70 line-clamp-2">{article.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.24em]">
                    <span className="text-ink/60">{article.readTime}</span>
                    <ArrowRight className="h-4 w-4 text-accent transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {paginatedArticles.length > 2 && (
        <BlogArticles
          articles={paginatedArticles.slice(2)}
          openId={activeId}
          onOpen={(id) => setActiveId(id)}
          onClose={() => setActiveId(null)}
          noResultsText={noResultsText}
        />
      )}

      {otherArticles.length === 0 && (
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-10 text-center text-sm text-ink/70">
          {noResultsText ?? "No articles found for this category."}
        </div>
      )}

      {totalPages > 1 && otherArticles.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full border border-ink/10 p-2.5 text-ink transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-accent hover:text-accent"
            aria-label="Önceki sayfa"
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
            aria-label="Sonraki sayfa"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {activeId && (
        <BlogArticles
          articles={filteredArticles.filter((a) => a.id === activeId)}
          openId={activeId}
          onOpen={() => {}}
          onClose={() => setActiveId(null)}
          noResultsText={noResultsText}
        />
      )}
    </div>
  );
}
