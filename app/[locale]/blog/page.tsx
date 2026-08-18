import {Download} from "lucide-react";
import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import {BlogSection} from "@/app/[locale]/blog/BlogSection";
import type {BlogPost} from "@/lib/api/blog";
import {getBlogCategories, getBlogPosts} from "@/lib/api/blog";
import {getCatalogDocuments} from "@/lib/api/catalog";
import {getSeoPage, toMetadata} from "@/lib/api/seo";

function toBlogArticle(post: BlogPost, locale: Locale, readTime: string) {
  return {
    id: post.id,
    slug: post.slug,
    category: post.category[locale],
    filter: post.categorySlug,
    title: post.title[locale],
    summary: post.excerpt[locale],
    details: post.content?.[locale] ?? post.excerpt[locale],
    readTime,
    imageSrc: post.image,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [seo, t] = await Promise.all([
    getSeoPage("blog", locale),
    getTranslations({locale, namespace: "sections"}),
  ]);

  return toMetadata(seo, {title: t("blogTitle"), description: t("blogText")});
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const [posts, categories, catalogDocuments] = await Promise.all([
    getBlogPosts(locale),
    getBlogCategories(locale),
    getCatalogDocuments(locale),
  ]);
  const translatedArticles = posts.map((post) =>
    toBlogArticle(post, locale, t("blogReadTime", {minutes: post.readTimeMinutes})),
  );

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
        crabs
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.75fr_1fr] lg:px-0">
        <BlogSection
          locale={locale}
          featuredArticle={translatedArticles[0]}
          articles={translatedArticles}
          filters={[
            {id: "blogFilterAll", label: t("blogFilterAll")},
            ...categories.map((category) => ({id: category.slug, label: category.name[locale]})),
          ]}
          placeholder={t("blogSearchPlaceholder")}
          noResultsText={t("blogNoArticlesFound")}
          featuredTag={t("blogFeaturedTag")}
          detailLabel={t("blogDetailLabel")}
          prevPageLabel={t("blogPrevPage")}
          nextPageLabel={t("blogNextPage")}
          sidebarChildren={
            catalogDocuments.length > 0 ? (
              <div className="rounded-[1.5rem] border border-ink/10 bg-white p-8 shadow-[0_12px_30px_rgba(17,17,20,0.08)]">
                <h3 className="text-2xl font-black text-ink">{t("blogResourcesTitle")}</h3>
                <ul className="mt-6 space-y-4">
                  {catalogDocuments.map((doc) => (
                    <li key={doc.id}>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-neutral-soft px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent/20 hover:bg-white"
                      >
                        <span className="truncate">{doc.title[locale]}</span>
                        <Download className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          }
        />
      </section>
    </main>
  );
}
