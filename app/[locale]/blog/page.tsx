import {BlogBody, InternalHero} from "@/components/sections/InternalPage";
import type {Locale} from "@/i18n/routing";

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params;

  return (
    <main>
      <InternalHero locale={locale} kind="blog" />
      <BlogBody locale={locale} />
    </main>
  );
}
