import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { Locale } from "@/i18n/routing";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: "Products" });

  return (
    <main className="bg-white min-h-screen pb-20">
      <PageHeader
        locale={locale}
        title={t("title")}
        description={t("description")}
        breadcrumbs={[
          { label: "Anasayfa", href: "/" },
          { label: "Ürünler" },
        ]}
      />

      <div className="pt-12">
        <ProductGrid locale={locale} />
      </div>
    </main>
  );
}