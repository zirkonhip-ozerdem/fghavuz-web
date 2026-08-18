import {ArrowRight} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import {getProductCategories} from "@/lib/api/products";

const labels = {
  en: {viewModels: "View models"},
  tr: {viewModels: "Modelleri İncele"},
  ar: {viewModels: "عرض النماذج"},
} satisfies Record<Locale, {viewModels: string}>;

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
    <main className="min-h-screen bg-gray-50 pb-16">
      <PageHeader
        locale={locale}
        title={t("productsTitle")}
        description={t("productsText")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("products")},
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/category/${category.slug}`}
              locale={locale}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-72 w-full items-center justify-center border-b border-gray-50 bg-white p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {category.name}
                  </h2>
                  {category.description ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                      {category.description}
                    </p>
                  ) : null}
                </div>
                <div className="mt-6 flex items-center font-semibold text-blue-600">
                  <span>{labels[locale].viewModels}</span>
                  <ArrowRight className="ms-2 size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
