"use client";

import {ChevronDown, Languages, Menu, Search} from "lucide-react";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
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
  const pathname = usePathname() ?? "";

  const activeLink = (href: string) =>
    href === "/"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20 shadow-sm transition-all duration-500 hover:bg-white/95">
      <div className="flex justify-between items-center px-5 md:px-8 max-w-7xl mx-auto h-20">
        <Logo locale={locale} />

        <div className="hidden md:flex items-center gap-8">
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
            className="hidden md:grid h-10 w-10 place-items-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Search"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>

          <div className="relative group hidden md:block">
            <button
              type="button"
              className="flex items-center justify-center gap-2 h-9 w-[130px] rounded-full text-xs font-semibold uppercase text-ink/80 bg-transparent transition-colors hover:bg-slate-100"
              aria-label={t("language")}
            >
              <Languages className="size-4" aria-hidden="true" />
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
            className="hidden md:inline-flex h-9 w-[130px] items-center justify-center rounded-full bg-primary text-white text-xs font-semibold transition-all duration-300 hover:bg-primary-dark"
          >
            {t("quote")}
          </Link>

          <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-slate-900 hover:bg-slate-100 transition-colors">
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}
