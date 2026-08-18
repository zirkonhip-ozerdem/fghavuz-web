import {defineRouting} from "next-intl/routing";

export const pathnames = {
  "/corporate": {
    en: "/corporate",
    tr: "/kurumsal",
    ar: "/corporate",
  },
  "/products": {
    en: "/products",
    tr: "/urunlerimiz",
    ar: "/products",
  },
  "/products/category/[slug]": {
    en: "/products/[slug]",
    tr: "/urunlerimiz/[slug]",
    ar: "/products/[slug]",
  },
  "/products/category/[slug]/[subcategorySlug]": {
    en: "/products/[slug]/[subcategorySlug]",
    tr: "/urunlerimiz/[slug]/[subcategorySlug]",
    ar: "/products/[slug]/[subcategorySlug]",
  },
  "/products/[slug]": {
    en: "/product/[slug]",
    tr: "/urun/[slug]",
    ar: "/product/[slug]",
  },
  "/blog": {
    en: "/blog",
    tr: "/blog",
    ar: "/blog",
  },
  "/blog/category/[categorySlug]/[slug]": {
    en: "/blog/[categorySlug]/[slug]",
    tr: "/blog/[categorySlug]/[slug]",
    ar: "/blog/[categorySlug]/[slug]",
  },
  "/catalog": {
    en: "/catalog",
    tr: "/katalog",
    ar: "/catalog",
  },
  "/contact": {
    en: "/contact",
    tr: "/iletisim",
    ar: "/contact",
  },
  "/quote": {
    en: "/quote",
    tr: "/teklif-al",
    ar: "/quote",
  },
  "/legal/[slug]": {
    en: "/legal/[slug]",
    tr: "/yasal/[slug]",
    ar: "/legal/[slug]",
  },
} as const;

export const routing = defineRouting({
  locales: ["en", "tr", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames,
});

export type Locale = (typeof routing.locales)[number];
