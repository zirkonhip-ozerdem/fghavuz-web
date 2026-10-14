import type {Metadata} from "next";
import {getLocalizedHref} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {apiGet} from "./client";

export type SeoBlock = {
  title: string;
  description: string;
  keywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string;
  ogDescription: string;
  ogImage: string | null;
  robots: string;
};

export type RawSeoBlock = {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  robots: string | null;
};

/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL on the host (e.g. https://www.fgpool.com). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fghavuz.com").replace(/\/$/, "");
export const SITE_NAME = "FGPOOL";
export const FALLBACK_OG_IMAGE = "/assets/hero-pool.jpeg";

const OG_LOCALES: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  ar: "ar_AR",
};

/** Internal (unlocalized) href, either shared by all locales or given per locale. */
export type SeoPath = string | Partial<Record<Locale, string>>;

export function mapSeoBlock(raw: RawSeoBlock | null | undefined): SeoBlock | null {
  if (!raw) return null;

  return {
    title: raw.title ?? "",
    description: raw.description ?? "",
    keywords: raw.keywords || null,
    canonicalUrl: raw.canonical_url || null,
    ogTitle: raw.og_title || raw.title || "",
    ogDescription: raw.og_description || raw.description || "",
    ogImage: raw.og_image || null,
    robots: raw.robots || "index, follow",
  };
}

export async function getSeoPage(pageKey: string, locale: Locale): Promise<SeoBlock | null> {
  try {
    const raw = await apiGet<RawSeoBlock>(`/seo/${pageKey}`, {locale});
    return mapSeoBlock(raw);
  } catch {
    return null;
  }
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolvePaths(path: SeoPath): Partial<Record<Locale, string>> {
  if (typeof path !== "string") return path;
  return Object.fromEntries(routing.locales.map((locale) => [locale, path]));
}

/** Localized public URLs (relative) for every locale that has this page. */
export function getLocalizedUrls(path: SeoPath) {
  const paths = resolvePaths(path);
  const urls: Partial<Record<Locale, string>> = {};

  for (const locale of routing.locales) {
    const internal = paths[locale];
    if (internal) urls[locale] = getLocalizedHref(internal, locale);
  }

  return urls;
}

export function buildAlternates(locale: Locale, path: SeoPath, canonicalOverride?: string | null) {
  const urls = getLocalizedUrls(path);
  const languages: Record<string, string> = {...urls};
  const defaultUrl = urls[routing.defaultLocale];

  if (defaultUrl) languages["x-default"] = defaultUrl;

  return {
    canonical: canonicalOverride || urls[locale] || `/${locale}`,
    languages,
  };
}

export function toMetadata(
  seo: SeoBlock | null,
  fallback: {title: string; description: string; image?: string | null},
  context: {locale: Locale; path: SeoPath; type?: "website" | "article"},
): Metadata {
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  const image = seo?.ogImage || fallback.image || FALLBACK_OG_IMAGE;
  const alternates = buildAlternates(context.locale, context.path, seo?.canonicalUrl);
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;

  return {
    // Titles that already carry the brand skip the "%s | FGPOOL" template.
    title: title.includes(SITE_NAME) ? {absolute: title} : title,
    description,
    ...(seo?.keywords ? {keywords: seo.keywords} : {}),
    ...(seo?.robots ? {robots: seo.robots} : {}),
    alternates,
    openGraph: {
      type: context.type ?? "website",
      siteName: SITE_NAME,
      locale: OG_LOCALES[context.locale],
      url: alternates.canonical,
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}

/** Serializes JSON-LD safely for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown) {
  return {__html: JSON.stringify(data).replace(/</g, "\\u003c")};
}

/** Strips markup and trims text to a meta-description-friendly length. */
export function plainSummary(text: string | null | undefined, maxLength = 160) {
  const plain = (text ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}
