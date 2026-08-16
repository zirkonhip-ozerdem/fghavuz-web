/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import ProductCard from "@/components/sections/products/ProductCard";
import type { Locale } from "@/i18n/routing";
import { getProducts, getProductCategories } from "@/lib/api/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const navT = await getTranslations({ locale, namespace: "nav" });

  const allProducts = await getProducts(locale);
  const categoryProducts = allProducts.filter((p: any) => p.category?.slug === slug);

  const categories = await getProductCategories(locale);
  const currentCategory = categories.find((c: any) => c.slug === slug);

  const groupedProducts = categoryProducts.reduce((acc: any, product: any) => {
    const subName = product.subcategory?.name || "Modeller";
    if (!acc[subName]) acc[subName] = [];
    acc[subName].push(product);
    return acc;
  }, {});

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={currentCategory?.name || "Kategori Ürünleri"}
        description={`${currentCategory?.name || ''} kategorisindeki modellerimizi ve alt ürünlerimizi inceleyin.`}
        breadcrumbs={[
          { label: navT("home"), href: `/${locale}` },
          { label: navT("products"), href: `/${locale}/products` },
          { label: currentCategory?.name || "Kategori" },
        ]}
      />
      
      <div className="container mx-auto px-4 max-w-7xl py-16">
        {categoryProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12 text-lg bg-white rounded-lg shadow-sm border border-gray-100">
            Bu kategoride henüz ürün bulunmuyor.
          </div>
        ) : (
          <div>
            {Object.entries(groupedProducts).map(([subName, products]: any) => (
              <div key={subName} className="mb-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 border-b-4 border-blue-600 pb-2 inline-block">
                    {subName}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}