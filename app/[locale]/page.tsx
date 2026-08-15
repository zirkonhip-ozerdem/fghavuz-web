import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
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
  getCatalogDocuments,
  getFeaturedCategories,
  getProjects,
  getShowcaseCategories,
} from "@/lib/api/catalog";
import {getCorporate} from "@/lib/api/corporate";
import {getSeoPage, toMetadata} from "@/lib/api/seo";
import {resolveVideoSource} from "@/lib/video";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [seo, t] = await Promise.all([
    getSeoPage("home", locale),
    getTranslations({locale, namespace: "meta"}),
  ]);

  return toMetadata(seo, {title: t("title"), description: t("description")});
}

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [categories, showcaseCategories, advantages, projects, showcasePosts, catalogDocuments, corporate] =
    await Promise.all([
      getFeaturedCategories(locale),
      getShowcaseCategories(locale),
      getAdvantages(locale),
      getProjects(locale),
      getShowcaseBlogPosts(locale),
      getCatalogDocuments(locale),
      getCorporate(locale),
    ]);
  const videoSource = resolveVideoSource(corporate.videoUrl, corporate.videoMedia);

  return (
    <main>
      <Hero locale={locale} categories={categories} />
      <EngineeredComponents locale={locale} categories={showcaseCategories} />
      <CatalogShowcase locale={locale} documents={catalogDocuments} />
      <FeaturedBlogSection locale={locale} posts={showcasePosts} />
      <FactoryBanner videoSource={videoSource} />
      <AdvantageSection advantages={advantages} />
      <ReferencesSection projects={projects} />
      <CtaBanner locale={locale} />
    </main>
  );
}
