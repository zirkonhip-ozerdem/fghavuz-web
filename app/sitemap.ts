import type {MetadataRoute} from "next";
import {routing, type Locale} from "@/i18n/routing";
import {getBlogPosts} from "@/lib/api/blog";
import {getProductCategories, getProducts} from "@/lib/api/products";
import {absoluteUrl, getLocalizedUrls, type SeoPath} from "@/lib/api/seo";
import {legalDocuments} from "@/lib/data/legal";

export const revalidate = 3600;

type Entry = {
  path: SeoPath;
  lastModified?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

const STATIC_PAGES: Entry[] = [
  {path: "/", changeFrequency: "weekly", priority: 1},
  {path: "/products", changeFrequency: "weekly", priority: 0.9},
  {path: "/corporate", changeFrequency: "monthly", priority: 0.7},
  {path: "/catalog", changeFrequency: "monthly", priority: 0.7},
  {path: "/blog", changeFrequency: "weekly", priority: 0.7},
  {path: "/contact", changeFrequency: "yearly", priority: 0.6},
  {path: "/quote", changeFrequency: "yearly", priority: 0.6},
];

// Groups per-locale records by id so each URL can list its translations.
function groupById<T extends {id?: string}>(
  lists: [Locale, T[]][],
  toPath: (item: T) => string,
) {
  const groups = new Map<string, Partial<Record<Locale, string>>>();

  for (const [locale, items] of lists) {
    for (const item of items) {
      if (!item.id) continue;
      const group = groups.get(item.id) ?? {};
      group[locale] = toPath(item);
      groups.set(item.id, group);
    }
  }

  return Array.from(groups, ([id, path]) => ({id, path}));
}

function perLocale<T>(load: (locale: Locale) => Promise<T[]>) {
  return Promise.all(
    routing.locales.map(async (locale) => [locale, await load(locale)] as [Locale, T[]]),
  );
}

function toSitemap(entries: Entry[]): MetadataRoute.Sitemap {
  return entries.flatMap(({path, ...rest}) => {
    const urls = getLocalizedUrls(path);
    const languages = Object.fromEntries(
      Object.entries(urls).map(([locale, url]) => [locale, absoluteUrl(url)]),
    );

    return Object.values(urls).map((url) => ({
      url: absoluteUrl(url),
      ...rest,
      alternates: {languages},
    }));
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, posts] = await Promise.all([
    perLocale((locale) => getProductCategories(locale)),
    perLocale((locale) => getProducts(locale)),
    perLocale((locale) => getBlogPosts(locale)),
  ]);

  const categoryEntries: Entry[] = groupById(categories, (category) => {
    return `/products/category/${category.slug}`;
  }).map(({path}) => ({path, changeFrequency: "weekly", priority: 0.8}));

  const subcategoryLists = categories.map(([locale, items]) => [
    locale,
    items.flatMap((category) =>
      (category.subcategories ?? []).map((subcategory) => ({
        id: subcategory.id,
        path: `/products/category/${category.slug}/${subcategory.slug || subcategory.id}`,
      })),
    ),
  ]) as [Locale, {id?: string; path: string}[]][];
  const subcategoryEntries: Entry[] = groupById(subcategoryLists, (item) => item.path).map(
    ({path}) => ({path, changeFrequency: "weekly", priority: 0.7}),
  );

  const productEntries: Entry[] = groupById(products, (product) => {
    return `/products/${product.slug}`;
  }).map(({path}) => ({path, changeFrequency: "weekly", priority: 0.8}));

  const postDates = new Map(posts.flatMap(([, items]) => items.map((post) => [post.id, post.date])));
  const postEntries: Entry[] = groupById(posts, (post) => {
    return `/blog/${post.categorySlug}/${post.slug}`;
  }).map(({id, path}) => {
    const date = postDates.get(id);
    return {path, changeFrequency: "monthly", priority: 0.6, ...(date ? {lastModified: date} : {})};
  });

  const legalEntries: Entry[] = legalDocuments.map((document) => ({
    path: `/legal/${document.slug}`,
    lastModified: document.updated,
    changeFrequency: "yearly",
    priority: 0.2,
  }));

  return toSitemap([
    ...STATIC_PAGES,
    ...categoryEntries,
    ...subcategoryEntries,
    ...productEntries,
    ...postEntries,
    ...legalEntries,
  ]);
}
