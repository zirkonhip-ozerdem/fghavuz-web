import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import {ProductGrid} from "@/components/sections/ProductGrid";
import type {Locale} from "@/i18n/routing";
import {getProductCategories} from "@/lib/api/products";
import {getSeoPage, toMetadata} from "@/lib/api/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [seo, t] = await Promise.all([
    getSeoPage("products", locale),
    getTranslations({locale, namespace: "sections"}),
  ]);

  return toMetadata(seo, {title: t("productsTitle"), description: t("productsText")}, {locale, path: "/products"});
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const categories = await getProductCategories(locale);

  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader
        locale={locale}
        title={t("productsTitle")}
        description={t("productsText")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("products")},
        ]}
      />

      <div className="pt-12">
        <ProductGrid
          locale={locale}
          items={categories.map((category) => ({
            id: category.id,
            name: category.name,
            image: category.image,
            href: `/products/category/${category.slug}`,
          }))}
        />
      </div>
    </main>
  );
}
