import {Download} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {BlogSection} from "@/app/[locale]/blog/BlogSection";
import {TrendingStandards} from "@/app/[locale]/blog/TrendingStandards";

const categoryButtons = [
  { id: "blogFilterAll", label: "blogFilterAll" },
  { id: "blogFilterInstallation", label: "blogFilterInstallation" },
  { id: "blogFilterMaintenance", label: "blogFilterMaintenance" },
  { id: "blogFilterArchitecture", label: "blogFilterArchitecture" },
  { id: "blogFilterInnovation", label: "blogFilterInnovation" },
] as const;

const featuredArticles = [
  {
    id: "card-1",
    category: "blogCardOneCategory",
    filter: "blogFilterInnovation",
    title: "blogCardOneTitle",
    summary: "blogCardOneSummary",
    details: "blogCardOneDetails",
    readTime: "blogCardOneReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-2",
    category: "blogCardTwoCategory",
    filter: "blogFilterArchitecture",
    title: "blogCardTwoTitle",
    summary: "blogCardTwoSummary",
    details: "blogCardTwoDetails",
    readTime: "blogCardTwoReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-3",
    category: "blogCardThreeCategory",
    filter: "blogFilterInstallation",
    title: "blogCardThreeTitle",
    summary: "blogCardThreeSummary",
    details: "blogCardThreeDetails",
    readTime: "blogCardThreeReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-4",
    category: "blogCardFourCategory",
    filter: "blogFilterMaintenance",
    title: "blogCardFourTitle",
    summary: "blogCardFourSummary",
    details: "blogCardFourDetails",
    readTime: "blogCardFourReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-5",
    category: "blogCardFiveCategory",
    filter: "blogFilterInnovation",
    title: "blogCardFiveTitle",
    summary: "blogCardFiveSummary",
    details: "blogCardFiveDetails",
    readTime: "blogCardFiveReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-6",
    category: "blogCardSixCategory",
    filter: "blogFilterArchitecture",
    title: "blogCardSixTitle",
    summary: "blogCardSixSummary",
    details: "blogCardSixDetails",
    readTime: "blogCardSixReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
  {
    id: "card-7",
    category: "blogCardSevenCategory",
    filter: "blogFilterInstallation",
    title: "blogCardSevenTitle",
    summary: "blogCardSevenSummary",
    details: "blogCardSevenDetails",
    readTime: "blogCardSevenReadTime",
    imageSrc: "/assets/hero-pool.jpeg",
  },
] as const;

const resources = [
  {label: "blogResourceDWG", icon: Download, href: "/catalog"},
  {label: "blogResourceISO", icon: Download, href: "/catalog"},
  {label: "blogResourceSpecs", icon: Download, href: "/catalog"},
] as const;

const trendingItems = [
  {
    number: "01",
    title: "blogTrendingItemOneTitle",
    subtitle: "blogTrendingItemOneSubtitle",
    details: "blogTrendingItemOneDetails",
  },
  {
    number: "02",
    title: "blogTrendingItemTwoTitle",
    subtitle: "blogTrendingItemTwoSubtitle",
    details: "blogTrendingItemTwoDetails",
  },
  {
    number: "03",
    title: "blogTrendingItemThreeTitle",
    subtitle: "blogTrendingItemThreeSubtitle",
    details: "blogTrendingItemThreeDetails",
  },
] as const;

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});

  const translatedArticles = featuredArticles.map((article) => {
    const summary = t(article.summary);
    const details = t(article.details);
    const minutes = Math.max(5, Math.ceil((summary.length + details.length) / 180));

    return {
      ...article,
      category: t(article.category),
      title: t(article.title),
      summary,
      details,
      readTime: t("blogReadTime", {minutes}),
    };
  });

  const translatedTrendingItems = trendingItems.map((item) => ({
    ...item,
    title: t(item.title),
    subtitle: t(item.subtitle),
    details: t(item.details),
  }));

  return (
    <main className="bg-white text-ink">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">
              {t("blogTitle")}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-ink/70 sm:text-lg">
              {t("blogText")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[1.75fr_1fr] lg:px-0">
        <div className="space-y-8">
          <BlogSection
            featuredArticle={translatedArticles[0]}
            articles={translatedArticles}
            filters={categoryButtons.map((item) => ({ id: item.id, label: t(item.label) }))}
            placeholder={t("blogSearchPlaceholder")}
            noResultsText={t("blogNoArticlesFound")}
          />
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Resources Section */}
          <div className="rounded-[1.5rem] border border-ink/10 bg-white p-8 shadow-[0_12px_30px_rgba(17,17,20,0.08)]">
            <h3 className="text-2xl font-black text-ink">{t("blogResourcesTitle")}</h3>
            <ul className="mt-6 space-y-4">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <li key={resource.label}>
                    <Link
                      href={resource.href}
                      locale={locale}
                      className="flex items-center justify-between rounded-2xl border border-ink/10 bg-neutral-soft px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent/20 hover:bg-white"
                    >
                      <span>{t(resource.label)}</span>
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Trending Standards Section */}
          <TrendingStandards title={t("blogTrendingTitle")} items={translatedTrendingItems} />

          {/* Newsletter Section */}
          <div className="rounded-[1.5rem] bg-gradient-to-r from-[#ff5a5f] via-[#ff7f61] to-[#fea451] p-8 text-white shadow-[0_20px_50px_rgba(255,90,95,0.24)]">
            <h3 className="text-2xl font-black">{t("blogNewsletterTitle")}</h3>
            <p className="mt-3 text-sm leading-6 text-white/85">{t("blogNewsletterText")}</p>
            <form className="mt-6 space-y-3">
              <input
                type="email"
                placeholder={t("blogNewsletterPlaceholder")}
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/20"
              />
              <button
                type="button"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:bg-neutral-soft"
              >
                {t("blogNewsletterButton")}
              </button>
            </form>
          </div>
        </aside>
      </section>
    </main>
  );
}
