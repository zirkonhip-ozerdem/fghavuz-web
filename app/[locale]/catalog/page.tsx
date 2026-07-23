import {CatalogBody, InternalHero} from "@/components/sections/InternalPage";
import type {Locale} from "@/i18n/routing";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;

  return (
    <main>
      <InternalHero locale={locale} kind="catalog" />
      <CatalogBody locale={locale} />
    </main>
  );
}
