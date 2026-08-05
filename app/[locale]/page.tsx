import {Hero} from "@/components/sections/Hero";
import {
  AdvantageSection,
  CatalogShowcase,
  CtaBanner,
  EngineeredComponents,
  FactoryBanner,
  FeaturedBlogSection,
  ReferencesSection,
} from "@/components/sections/HomeSections";
import type {Locale} from "@/i18n/routing";
import {getShowcaseBlogPosts} from "@/lib/api/blog";
import {
  getAdvantages,
  getFeaturedCategories,
  getProjects,
  getShowcaseCategories,
} from "@/lib/api/catalog";

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [categories, showcaseCategories, advantages, projects, showcasePosts] =
    await Promise.all([
      getFeaturedCategories(),
      getShowcaseCategories(),
      getAdvantages(),
      getProjects(),
      getShowcaseBlogPosts(),
    ]);

  return (
    <main>
      <Hero locale={locale} categories={categories} />
      <EngineeredComponents locale={locale} categories={showcaseCategories} />
      <CatalogShowcase locale={locale} />
      <FeaturedBlogSection locale={locale} posts={showcasePosts} />
      <FactoryBanner />
      <AdvantageSection locale={locale} advantages={advantages} />
      <ReferencesSection locale={locale} projects={projects} />
      <CtaBanner locale={locale} />
    </main>
  );
}
