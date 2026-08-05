import {ArrowLeft} from "lucide-react";
import Image from "next/image";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {PageHeader} from "@/components/layout/PageHeader";
import {routing, type Locale} from "@/i18n/routing";
import {featuredArticles} from "@/app/[locale]/blog/blogData";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featuredArticles.map((article) => ({locale, id: article.id}))
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{locale: string; id: string}>;
}) {
  const {locale: rawLocale, id} = await params;
  const locale = rawLocale as Locale;
  const article = featuredArticles.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const summary = t(article.summary);
  const details = t(article.details);
  const minutes = Math.max(5, Math.ceil((summary.length + details.length) / 180));

  const category = t(article.category);
  const title = t(article.title);
  const readTime = t("blogReadTime", {minutes});

  return (
    <main className="bg-white text-ink pb-20">
      <PageHeader
        locale={locale}
        title={title}
        description={summary}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("blog"), href: "/blog"},
          {label: title},
        ]}
      />
      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-16">
        <Link
          href="/blog"
          locale={locale}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink/60 transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t("blogBackToBlog")}
        </Link>

        <div className="relative mt-6 h-72 overflow-hidden rounded-[2rem] bg-[#f5f3f0] sm:h-96">
          <Image
            src={article.imageSrc}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mt-8 space-y-6">
          <span className="inline-flex rounded-full bg-[#f0f0ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {category}
          </span>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-ink/60">{readTime}</p>
            <p className="text-base leading-8 text-ink/80">{details}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
