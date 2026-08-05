"use client";

import {ChevronDown, Menu, Search, X} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories, type ProductCategory} from "@/lib/api/catalog";
import {Logo} from "./Logo";

const navItems = [
  {key: "home", href: "/"},
  {key: "corporate", href: "/corporate"},
  {key: "products", href: "/products"},
  {key: "blog", href: "/blog"},
  {key: "catalog", href: "/catalog"},
  {key: "contact", href: "/contact"},
] as const;

export function Header({locale}: {locale: Locale}) {
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const panelOpen = searchOpen || mobileOpen;

  const activeLink = (href: string) =>
    href === "/"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  useEffect(() => {
    getFeaturedCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!panelOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePanels();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [panelOpen]);

  useEffect(() => {
    closePanels();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = panelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panelOpen]);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);

    if (!normalized) {
      return [];
    }

    return categories
      .filter((category) =>
        [category.name[locale], category.kicker[locale], category.slug]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalized),
      )
      .slice(0, 5);
  }, [categories, locale, query]);

  function closePanels() {
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
  }

  function openSearch() {
    setMobileOpen(false);
    setSearchOpen(true);
  }

  function toggleMobileMenu() {
    setSearchOpen(false);
    setMobileOpen((open) => !open);
  }

  function submitSearch() {
    const target = query.trim()
      ? `/products?search=${encodeURIComponent(query.trim())}`
      : "/products";
    router.push(`/${locale}${target}`);
    closePanels();
  }

  function goToCategory(slug: string) {
    router.push(`/${locale}/products/${slug}`);
    closePanels();
  }

  return (
    <>
      <nav className="fixed top-9 w-full z-50 h-20 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-500">
        <div className="flex h-full items-center justify-between px-5 md:px-8 max-w-7xl mx-auto">
          <Logo locale={locale} />

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                locale={locale}
                className={`font-medium text-sm tracking-tight transition ${
                  activeLink(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-ink/80 hover:text-[#F4B96A]"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 lg:grid"
              aria-label={tHome("searchButton")}
              aria-expanded={searchOpen}
            >
              <Search className="size-4" aria-hidden="true" />
            </button>

            <div className="relative group hidden lg:block">
              <button
                type="button"
                className="flex h-9 w-[118px] items-center justify-center gap-2 rounded-full bg-transparent text-xs font-semibold uppercase text-ink/80 transition-colors hover:bg-slate-100 xl:w-[130px]"
                aria-label={t("language")}
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="size-4 opacity-70" aria-hidden="true" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100 z-50">
                {(["en", "tr", "ar"] as const).map((item) => (
                  <Link
                    key={item}
                    href="/"
                    locale={item}
                    className={`flex items-center justify-between px-3 py-1.5 text-[11px] font-medium uppercase transition hover:bg-slate-100 ${
                      item === locale ? "text-primary" : "text-slate-600"
                    }`}
                  >
                    <span>{item.toUpperCase()}</span>
                    {item === locale ? (
                      <span className="text-[14px] text-primary">✓</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/quote"
              locale={locale}
              className="hidden h-9 w-[118px] items-center justify-center rounded-full bg-primary text-xs font-semibold text-white transition-all duration-300 hover:bg-primary-dark lg:inline-flex xl:w-[130px]"
            >
              {t("quote")}
            </Link>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
              aria-label={mobileOpen ? t("close") : t("menu")}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-[7.25rem] z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          panelOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closePanels}
        aria-hidden="true"
      />

      {/* Mobile nav menu */}
      <div
        className={`fixed inset-x-0 top-[7.25rem] z-50 max-h-[calc(100vh-7.25rem)] overflow-y-auto rounded-b-3xl bg-white shadow-[0_24px_60px_rgba(17,17,20,0.18)] transition-all duration-200 lg:hidden ${
          mobileOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              locale={locale}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                activeLink(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-ink/80 hover:bg-slate-100"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-4">
          {(["en", "tr", "ar"] as const).map((item) => (
            <Link
              key={item}
              href="/"
              locale={item}
              className={`flex-1 rounded-full border py-2 text-center text-xs font-semibold uppercase transition ${
                item === locale
                  ? "border-primary text-primary"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="px-5 pb-6">
          <Link
            href="/quote"
            locale={locale}
            className="flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-dark"
          >
            {t("quote")}
          </Link>
        </div>
      </div>

      {/* Search panel */}
      <div
        className={`fixed inset-x-0 top-[7.25rem] z-50 rounded-b-3xl bg-white shadow-[0_24px_60px_rgba(17,17,20,0.18)] transition-all duration-200 ${
          searchOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        role="search"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-6 md:px-8">
          <Search className="size-5 shrink-0 text-primary/60" aria-hidden="true" />
          <input
            ref={searchInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitSearch();
              }
            }}
            placeholder={tHome("search")}
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-ink outline-none placeholder:text-ink/42"
          />
          <button
            type="button"
            onClick={submitSearch}
            className="hidden shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase text-white transition hover:bg-primary-dark sm:inline-flex"
          >
            {tHome("searchButton")}
          </button>
          <button
            type="button"
            onClick={closePanels}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100"
            aria-label={t("close")}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {query.trim() && suggestions.length > 0 ? (
          <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
            <p className="px-1 pb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/42">
              {tHome("suggestions")}
            </p>
            <div className="overflow-hidden rounded-lg border border-ink/10">
              {suggestions.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => goToCategory(category.slug)}
                  className="block w-full border-b border-ink/8 px-4 py-3 text-start transition last:border-b-0 hover:bg-neutral-soft"
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
          </div>
        ) : null}
      </div>
    </>
  );
}
