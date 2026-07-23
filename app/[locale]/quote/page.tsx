import {InternalHero, QuoteBody} from "@/components/sections/InternalPage";
import type {Locale} from "@/i18n/routing";

export default async function QuotePage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;

  return (
    <main>
      <InternalHero locale={locale} kind="quote" />
      <QuoteBody />
    </main>
  );
}
