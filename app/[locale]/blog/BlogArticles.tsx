"use client";

import Image from "next/image";
import {useState, useEffect} from "react";
import {X} from "lucide-react";

export type BlogArticle = {
  id: string;
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
  openId?: string | null;
  onOpen?: (id: string) => void;
  onClose?: () => void;
  noResultsText?: string;
};

export function BlogArticles({articles, openId, onOpen, onClose, noResultsText}: BlogArticlesProps) {
  const [localActiveId, setLocalActiveId] = useState<string | null>(null);
  const activeId = openId ?? localActiveId;
  const activeArticle = articles.find((article) => article.id === activeId);
  const setActiveArticleId = onOpen ?? setLocalActiveId;
  const closeActiveArticle = onClose ?? (() => setLocalActiveId(null));

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeActiveArticle();
      }
    };

    if (activeArticle) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [activeArticle, closeActiveArticle]);

  return (
    <>
      {articles.length === 0 ? (
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-10 text-center text-sm text-ink/70">
          {noResultsText ?? "No articles found for this category."}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(17,17,20,0.08)]"
            >
              <button
                type="button"
                onClick={() => setActiveArticleId(article.id)}
                className="group flex w-full flex-col text-left"
              >
                <div className="relative h-52 overflow-hidden bg-[#f5f3f0]">
                  <Image
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <span className="inline-flex rounded-full bg-[#f0f0ff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                    {article.category}
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-ink">{article.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/70">{article.summary}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-xs uppercase tracking-[0.24em] text-ink/60">
                    <span>{article.readTime}</span>
                    <span className="text-accent">Detay</span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      )}

      {activeArticle ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 sm:p-10 overflow-y-auto">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(17,17,20,0.25)] my-auto">
            <button
              type="button"
              onClick={closeActiveArticle}
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 text-ink shadow-sm transition hover:bg-neutral-soft"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-80 overflow-hidden bg-[#f5f3f0]">
              <Image
                src={activeArticle.imageSrc}
                alt={activeArticle.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="space-y-6 p-8 sm:p-10">
              <span className="inline-flex rounded-full bg-[#f0f0ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                {activeArticle.category}
              </span>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-ink">{activeArticle.title}</h3>
                <p className="text-sm uppercase tracking-[0.24em] text-ink/60">{activeArticle.readTime}</p>
                <p className="text-base leading-8 text-ink/80">{activeArticle.details}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-ink/10">
                <button
                  type="button"
                  onClick={closeActiveArticle}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent/90"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
