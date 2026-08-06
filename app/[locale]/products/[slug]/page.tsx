import {BarChart3, FileText, ImageIcon, Settings} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import {PageHeader} from "@/components/layout/PageHeader";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getProductBySlug, getProducts} from "@/lib/api/products";

export async function generateStaticParams() {
  const products = await getProducts("en");

  return ["en", "tr", "ar"].flatMap((locale) =>
    products.map((product) => ({locale, slug: product.slug})),
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const product = await getProductBySlug(slug, locale);
  const t = await getTranslations({locale, namespace: "ProductDetail"});
  const navT = await getTranslations({locale, namespace: "nav"});

  if (!product) {
    notFound();
  }

  const galleryImages = product.galleryImages?.length ? product.galleryImages : [product.image];
  const documents = [
    {icon: FileText, title: t("userManual"), text: t("downloadPdf"), href: "#"},
    {icon: Settings, title: t("installGuide"), text: t("downloadPdf"), href: "#"},
    {icon: BarChart3, title: t("datasheet"), text: t("downloadPdf"), href: "#"},
    {icon: ImageIcon, title: t("techVisuals"), text: t("pendingVisual")},
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={product.title}
        description={product.description}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("products"), href: "/products"},
          {label: product.title},
        ]}
      />

        <div className="container mx-auto px-4 max-w-7xl py-16 relative z-[999]">
        <div className="mb-8 relative z-50">
          <Link
            href="/products"
            locale={locale}
            className="flex w-fit items-center gap-2 font-medium text-slate-600 transition-colors hover:text-red-500"
          >
            &larr; {t("backToProducts")}
          </Link>
        </div>

        <section className="mb-12 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm md:flex-row">
          <div className="flex w-full flex-col md:w-1/2">
            <ProductGallery images={galleryImages} />
          </div>

          <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12">
            <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              {product.series}
            </span>

            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {product.title}
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              {product.description}
            </p>

            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-slate-900">{t("features")}</h2>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <span className="me-3 font-bold text-red-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <Link
                href="/quote"
                locale={locale}
                className="inline-block w-full rounded bg-red-500 px-8 py-3 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md sm:w-auto"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-8 border-b border-gray-100 pb-4 text-2xl font-bold text-slate-900">
            {t("techDocs")}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map(({icon: Icon, title, text, href}) => {
              const content = (
                <>
                  <Icon className="mb-3 size-10 text-slate-700 transition-colors group-hover:text-red-500" aria-hidden="true" />
                  <span className="text-center font-semibold text-slate-900">{title}</span>
                  <span className="mt-2 text-xs text-gray-500">{text}</span>
                </>
              );

              return href ? (
                <a
                  key={title}
                  href={href}
                  className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:border-red-500 hover:shadow-md"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={title}
                  className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
