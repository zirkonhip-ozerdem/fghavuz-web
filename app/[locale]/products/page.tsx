import {InternalHero, ProductList} from "@/components/sections/InternalPage";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories} from "@/lib/api/catalog";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;
  const categories = await getFeaturedCategories();

  return (
    <main>
      <InternalHero locale={locale} kind="products" />
      <ProductList locale={locale} categories={categories} />
    </main>
  );
}
