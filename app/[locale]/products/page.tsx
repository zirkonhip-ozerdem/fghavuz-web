import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { getProductCategories } from "@/lib/api/products";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "sections" });
  const navT = await getTranslations({ locale, namespace: "nav" });
  
  const categories = await getProductCategories(locale);

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={t("productsTitle") || "Ürün Sistemleri"}
        description={t("productsText") || "Fgpool havuz projeleriniz için temel ekipman ailelerini inceleyin."}
        breadcrumbs={[
          { label: navT("home"), href: `/${locale}` },
          { label: navT("products") },
        ]}
      />
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/${locale}/products/category/${category.slug}`}
              className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-72 w-full bg-white flex items-center justify-center p-6 border-b border-gray-50">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={category.cover_image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${category.cover_image}` : "/assets/category-pool-pumps.png"} 
                  alt={category.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>
                </div>
                <div className="mt-6 flex items-center text-blue-600 font-semibold">
                  <span>Modelleri İncele</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}