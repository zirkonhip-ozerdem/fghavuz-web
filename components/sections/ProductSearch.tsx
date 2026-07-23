"use client";

import {Search} from "lucide-react";
import {useMemo, useState} from "react";
import {useRouter} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {ProductCategory} from "@/lib/api/catalog";

export function ProductSearch({
  locale,
  categories,
  placeholder,
  buttonLabel,
  suggestionsLabel,
}: {
  locale: Locale;
  categories: ProductCategory[];
  placeholder: string;
  buttonLabel: string;
  suggestionsLabel: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);

    if (!normalized) {
      return categories.slice(0, 3);
    }

    return categories
      .filter((category) =>
        [category.name[locale], category.kicker[locale], category.slug]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalized),
      )
      .slice(0, 4);
  }, [categories, locale, query]);

  function submit() {
    const target = query.trim()
      ? `/products?search=${encodeURIComponent(query.trim())}`
      : "/products";
    router.push(target);
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex min-h-14 items-center gap-3 rounded-lg border border-white/42 bg-white/90 p-2 shadow-[0_18px_44px_rgba(17,17,20,0.13)] backdrop-blur">
        <Search className="ms-3 size-5 shrink-0 text-primary/55" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink/42"
        />
        <button
          type="button"
          onClick={submit}
          className="rounded-md bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-light"
        >
          {buttonLabel}
        </button>
      </div>

      {suggestions.length > 0 && query.trim() ? (
        <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-lg border border-ink/10 bg-white p-2 shadow-[0_18px_40px_rgba(17,17,20,0.14)]">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/42">
            {suggestionsLabel}
          </p>
          {suggestions.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => router.push(`/products/${category.slug}`)}
              className="block w-full rounded-md px-3 py-2 text-start transition hover:bg-neutral-soft"
            >
              <span className="block text-sm font-bold text-ink">
                {category.name[locale]}
              </span>
              <span className="block text-xs text-ink/55">
                {category.description[locale]}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
