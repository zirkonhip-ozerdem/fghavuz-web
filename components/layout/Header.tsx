import {ChevronDown, Languages, Search} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories} from "@/lib/api/catalog";
import {Logo} from "./Logo";

const navItems = [
  {key: "home", href: "/"},
  {key: "corporate", href: "/corporate"},
  {key: "products", href: "/products"},
  {key: "catalog", href: "/catalog"},
  {key: "blog", href: "/blog"},
  {key: "contact", href: "/contact"},
] as const;

export async function Header({locale}: {locale: Locale}) {
  const t = await getTranslations("nav");
  const categories = await getFeaturedCategories();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/8 bg-white/86 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-5 px-5 sm:px-8">
        <Logo locale={locale} />

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => {
            if (item.key === "products") {
              return (
                <div className="group relative" key={item.key}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-neutral-soft hover:text-primary"
                  >
                    {t(item.key)}
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute start-0 top-full w-[33rem] translate-y-3 rounded-lg border border-ink/10 bg-white p-3 opacity-0 shadow-[0_24px_60px_rgba(17,17,20,0.14)] transition group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products/${category.slug}`}
                          locale={locale}
                          className="rounded-md border border-transparent p-3 transition hover:border-primary/12 hover:bg-neutral-soft"
                        >
                          <span className="block text-xs font-bold uppercase tracking-[0.16em] text-accent">
                            {category.kicker[locale]}
                          </span>
                          <span className="mt-1 block text-sm font-extrabold text-ink">
                            {category.name[locale]}
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-ink/58">
                            {category.description[locale]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                locale={locale}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-neutral-soft hover:text-primary"
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link
            href="/products"
            locale={locale}
            className="hidden size-10 place-items-center rounded-full border border-ink/10 text-ink/68 transition hover:border-primary/24 hover:text-primary sm:grid"
            aria-label="Search"
          >
            <Search className="size-4" aria-hidden="true" />
          </Link>
          <div className="group relative">
            <button
              className="flex h-10 items-center gap-1 rounded-full border border-ink/10 px-3 text-xs font-bold uppercase text-ink/70 transition hover:border-primary/25"
              aria-label={t("language")}
            >
              <Languages className="size-4" aria-hidden="true" />
              {locale}
            </button>
            <div className="invisible absolute end-0 top-full flex translate-y-3 flex-col rounded-lg border border-ink/10 bg-white p-1 opacity-0 shadow-[0_20px_44px_rgba(17,17,20,0.13)] transition group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
              {(["en", "tr", "ar"] as const).map((item) => (
                <Link
                  key={item}
                  href="/"
                  locale={item}
                  className="rounded-md px-4 py-2 text-sm font-semibold uppercase text-ink/70 hover:bg-neutral-soft"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/quote"
            locale={locale}
            className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-bold text-white shadow-[0_10px_24px_rgba(232,72,58,0.25)] transition hover:bg-accent-dark"
          >
            {t("quote")}
          </Link>
        </div>
      </div>
    </header>
  );
}
