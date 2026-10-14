import {routing, type Locale} from "@/i18n/routing";
import {getBlogPosts} from "./blog";
import {getProductCategories, getProducts} from "./products";

// Slugs are translated per locale, so hreflang alternates are resolved by
// matching the record id across each locale's listing.
type LocalePaths = Partial<Record<Locale, string>>;

async function collect(build: (locale: Locale) => Promise<string | undefined>) {
  const entries = await Promise.all(
    routing.locales.map(async (locale) => [locale, await build(locale)] as const),
  );
  const paths: LocalePaths = {};

  for (const [locale, path] of entries) {
    if (path) paths[locale] = path;
  }

  return paths;
}

export function getProductPaths(id: string) {
  return collect(async (locale) => {
    const product = (await getProducts(locale)).find((item) => item.id === id);
    return product ? `/products/${product.slug}` : undefined;
  });
}

export function getCategoryPaths(id: string) {
  return collect(async (locale) => {
    const category = (await getProductCategories(locale)).find((item) => item.id === id);
    return category ? `/products/category/${category.slug}` : undefined;
  });
}

export function getSubcategoryPaths(categoryId: string, subcategoryId: string) {
  return collect(async (locale) => {
    const category = (await getProductCategories(locale)).find((item) => item.id === categoryId);
    const subcategory = category?.subcategories?.find((item) => item.id === subcategoryId);
    return category && subcategory
      ? `/products/category/${category.slug}/${subcategory.slug || subcategory.id}`
      : undefined;
  });
}

export function getBlogPostPaths(id: string) {
  return collect(async (locale) => {
    const post = (await getBlogPosts(locale)).find((item) => item.id === id);
    return post ? `/blog/${post.categorySlug}/${post.slug}` : undefined;
  });
}

/** Ensures the current locale's own URL is always present, even if a listing missed it. */
export function withCurrent(paths: LocalePaths, locale: Locale, current: string): LocalePaths {
  return {...paths, [locale]: paths[locale] ?? current};
}
