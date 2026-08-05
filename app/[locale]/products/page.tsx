import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import ProductCard from "@/components/sections/products/ProductCard";
import type {Locale} from "@/i18n/routing";
import {getProducts} from "@/lib/api/products";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const products = await getProducts(locale);

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={t("productsTitle")}
        description={t("productsText")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("products")},
        ]}
      />
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </main>
  );
}
