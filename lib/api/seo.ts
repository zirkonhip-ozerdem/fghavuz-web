import type {Metadata} from "next";
import type {Locale} from "@/i18n/routing";
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

const FALLBACK_OG_IMAGE = "/assets/hero-pool.jpeg";

export function mapSeoBlock(raw: RawSeoBlock | null | undefined): SeoBlock | null {
  if (!raw) return null;

  return {
    title: raw.title ?? "",
    description: raw.description ?? "",
    keywords: raw.keywords,
    canonicalUrl: raw.canonical_url,
    ogTitle: raw.og_title || raw.title || "",
    ogDescription: raw.og_description || raw.description || "",
    ogImage: raw.og_image,
    robots: raw.robots || "index, follow",
  };
}

/** Route-level SEO record managed in the admin panel (Sayfa SEO Ayarları). */
export async function getSeoPage(pageKey: string, locale: Locale): Promise<SeoBlock | null> {
  try {
    const raw = await apiGet<RawSeoBlock>(`/seo/${pageKey}`, {locale});
    return mapSeoBlock(raw);
  } catch {
    return null;
  }
}

export function toMetadata(
  seo: SeoBlock | null,
  fallback: {title: string; description: string},
): Metadata {
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;

  return {
    title,
    description,
    ...(seo?.keywords ? {keywords: seo.keywords} : {}),
    ...(seo?.canonicalUrl ? {alternates: {canonical: seo.canonicalUrl}} : {}),
    ...(seo?.robots ? {robots: seo.robots} : {}),
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [seo?.ogImage || FALLBACK_OG_IMAGE],
    },
  };
}
