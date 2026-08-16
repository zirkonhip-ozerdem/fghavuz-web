import { BarChart3, FileText, ImageIcon, Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import type { Locale } from "@/i18n/routing";
import { getProductBySlug } from "@/lib/api/products";


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  
  const product = await getProductBySlug(slug, locale);
  
  const t = await getTranslations({ locale, namespace: "ProductDetail" });
  const navT = await getTranslations({ locale, namespace: "nav" });

  if (!product) {
    notFound();
  }

  const galleryImages = product.galleryImages?.length > 0 
    ? product.galleryImages 
    : (product.image ? [product.image] : []);
    
  const features = Array.isArray(product.features) ? product.features : [];

  const documents = [
    { icon: FileText, title: t("userManual") || "Kullanım Kılavuzu", text: t("downloadPdf") || "PDF dosyasını indir", href: "#" },
    { icon: Settings, title: t("installGuide") || "Kurulum Kılavuzu", text: t("downloadPdf") || "PDF dosyasını indir", href: "#" },
    { icon: BarChart3, title: t("datasheet") || "Veri Sayfası", text: t("downloadPdf") || "PDF dosyasını indir", href: "#" },
    { icon: ImageIcon, title: t("techVisuals") || "Teknik Görseller", text: t("pendingVisual") || "Görsel Bekleniyor" },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <PageHeader
        locale={locale}
        title={product.title}
        description={product.description || product.short_description || ""}
        breadcrumbs={[
          { label: navT("home"), href: `/${locale}` },
          { label: navT("products"), href: `/${locale}/products` },
          { label: product.title },
        ]}
      />

      <div className="container mx-auto px-4 max-w-7xl py-16 relative z-[999]">
        <div className="mb-8 relative z-50">
          <Link
            href={`/${locale}/products`}
            className="flex w-fit items-center gap-2 font-medium text-slate-600 transition-colors hover:text-red-500"
          >
            &larr; {t("backToProducts") || "Ürünlere Geri Dön"}
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
            {product.series && (
              <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                {product.series}
              </span>
            )}

            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {product.title}
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              {product.description || product.short_description}
            </p>

            {features.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-4 text-xl font-bold text-slate-900">{t("features") || "Özellikler"}</h2>
                <ul className="space-y-3">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="me-3 font-bold text-red-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <Link
                href={`/${locale}/quote`}
                className="inline-block w-full rounded bg-red-500 px-8 py-3 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md sm:w-auto"
              >
                {t("getQuote") || "Fiyat Teklifi İsteyin"}
              </Link>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-8 border-b border-gray-100 pb-4 text-2xl font-bold text-slate-900">
            {t("techDocs") || "Teknik Dokümanlar"}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {documents.map(({ icon: Icon, title, text, href }, idx) => {
              const content = (
                <>
                  <Icon className="mb-3 size-10 text-slate-700 transition-colors group-hover:text-red-500" aria-hidden="true" />
                  <span className="text-center font-semibold text-slate-900">{title}</span>
                  <span className="mt-2 text-xs text-gray-500">{text}</span>
                </>
              );

              return href !== "#" ? (
                <a
                  key={idx}
                  href={href}
                  className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:border-red-500 hover:shadow-md"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={idx}
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