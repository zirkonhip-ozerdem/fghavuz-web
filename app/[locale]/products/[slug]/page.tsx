import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import {PageHeader, type BreadcrumbItem} from "@/components/layout/PageHeader";
import {ProductDocumentsPreview} from "@/components/sections/products/ProductDocumentsPreview";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {
  getProductBySlug,
  getProductCategories,
  getProducts,
  getProductSubcategories,
  type ProductDocument,
  type ProductCategory,
  type ProductSubcategory,
} from "@/lib/api/products";

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
  const [product, categories] = await Promise.all([
    getProductBySlug(slug, locale),
    getProductCategories(locale),
  ]);
  const t = await getTranslations({locale, namespace: "ProductDetail"});
  const navT = await getTranslations({locale, namespace: "nav"});

  if (!product) {
    notFound();
  }

  const category =
    product.category ||
    categories.find((item) => {
      return item.id === product.categoryId || item.slug === product.categoryId;
    });
  const subcategories = category
    ? await getProductSubcategories(category.slug, locale)
    : [];
  const subcategory =
    product.subcategory ||
    subcategories.find((item) => {
      return (
        item.id === product.subcategoryId ||
        item.slug === product.subcategory?.slug ||
        item.name === product.subcategory?.name
      );
    });
  const breadcrumbCategory: ProductCategory | undefined = category;
  const breadcrumbSubcategory: ProductSubcategory | undefined = subcategory;
  const breadcrumbs: BreadcrumbItem[] = [
    {label: navT("home"), href: "/"},
    {label: navT("products"), href: "/products"},
    ...(breadcrumbCategory
      ? [
          {
            label: breadcrumbCategory.name,
            href: `/products/category/${breadcrumbCategory.slug}`,
          },
        ]
      : []),
    ...(breadcrumbCategory && breadcrumbSubcategory
      ? [
          {
            label: breadcrumbSubcategory.name,
            href: `/products/category/${breadcrumbCategory.slug}/${breadcrumbSubcategory.slug || breadcrumbSubcategory.id}`,
          },
        ]
      : []),
    {label: product.title},
  ];
  const galleryImages = product.galleryImages?.length
    ? product.galleryImages
    : product.image
      ? [product.image]
      : [];
  const features = Array.isArray(product.features) ? product.features : [];
  const fallbackDocuments: ProductDocument[] = [
    {id: "user-manual", title: t("userManual"), href: "#", format: "PDF"},
    {id: "install-guide", title: t("installGuide"), href: "#", format: "PDF"},
    {id: "datasheet", title: t("datasheet"), href: "#", format: "XLS"},
    {id: "technical-visuals", title: t("techVisuals"), href: "#", format: "DOC", description: t("pendingVisual")},
  ];
  const documents = product.documents?.length ? product.documents : fallbackDocuments;

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={product.title}
        breadcrumbs={breadcrumbs}
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
            {galleryImages.length > 0 ? (
              <ProductGallery images={galleryImages} />
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center bg-gray-100 text-gray-400">
                Görsel Bulunamadı
              </div>
            )}
          </div>

          <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12">
            {product.series ? (
              <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {product.series}
              </span>
            ) : null}

            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {product.title}
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              {product.description || product.short_description}
            </p>

            {features.length > 0 ? (
              <div className="mb-10">
                <h2 className="mb-4 text-xl font-bold text-slate-900">{t("features")}</h2>
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <span className="me-3 font-bold text-red-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

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

        <section className="overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8 lg:p-10">
          <h2 className="mb-8 border-b border-gray-100 pb-4 text-2xl font-bold text-slate-900">
            {t("techDocs")}
          </h2>

          <ProductDocumentsPreview
            documents={documents}
            labels={{
              open: t("openDocument"),
              download: t("downloadDocument"),
              previewUnavailable: t("previewUnavailable"),
            }}
          />
        </section>
      </div>
    </main>
  );
}
