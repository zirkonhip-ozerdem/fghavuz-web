import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import {BlogSection} from "@/app/[locale]/blog/BlogSection";
import {categoryButtons, featuredArticles, resources} from "@/app/[locale]/blog/blogData";

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});

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

  return (
    <main className="bg-white text-ink">
      <PageHeader
        locale={locale}
        title={t("blogTitle")}
        description={t("blogText")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("blog")},
        ]}
      />

      {/* Main Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.75fr_1fr] lg:px-0">
        <BlogSection
          locale={locale}
          featuredArticle={translatedArticles[0]}
          articles={translatedArticles}
          filters={categoryButtons.map((item) => ({ id: item.id, label: t(item.label) }))}
          placeholder={t("blogSearchPlaceholder")}
          noResultsText={t("blogNoArticlesFound")}
          featuredTag={t("blogFeaturedTag")}
          detailLabel={t("blogDetailLabel")}
          prevPageLabel={t("blogPrevPage")}
          nextPageLabel={t("blogNextPage")}
          sidebarChildren={
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
          }
        />
      </section>
    </main>
  );
}
