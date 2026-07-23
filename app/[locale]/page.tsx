import {Hero} from "@/components/sections/Hero";
import {
  AdvantageSection,
  CtaBanner,
  EngineeredComponents,
  FactoryBanner,
  ProjectGallery,
} from "@/components/sections/HomeSections";
import type {Locale} from "@/i18n/routing";
import {
  getAdvantages,
  getFeaturedCategories,
  getProjects,
} from "@/lib/api/catalog";

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [categories, advantages, projects] = await Promise.all([
    getFeaturedCategories(),
    getAdvantages(),
    getProjects(),
  ]);

  return (
    <main>
      <Hero locale={locale} categories={categories} />
      <EngineeredComponents locale={locale} categories={categories} />
      <FactoryBanner />
      <AdvantageSection locale={locale} advantages={advantages} />
      <ProjectGallery locale={locale} projects={projects} />
      <CtaBanner locale={locale} />
    </main>
  );
}
