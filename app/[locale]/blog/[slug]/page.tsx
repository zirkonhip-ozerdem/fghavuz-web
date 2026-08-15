import {ArrowLeft} from "lucide-react";
import type {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {PageHeader} from "@/components/layout/PageHeader";
import type {Locale} from "@/i18n/routing";
import {getBlogPostBySlug} from "@/lib/api/blog";
import {toMetadata} from "@/lib/api/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    return {};
  }

  return toMetadata(post.seo, {title: post.title, description: post.excerpt});
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const readTime = post.readTimeMinutes > 0 ? t("blogReadTime", {minutes: post.readTimeMinutes}) : null;
  const dateLabel = post.date
    ? new Intl.DateTimeFormat(locale, {day: "numeric", month: "long", year: "numeric"}).format(
        new Date(post.date),
      )
    : null;
  const metaLabel = [dateLabel, readTime].filter(Boolean).join(" · ");

  return (
    <main className="bg-white text-ink pb-20">
      <PageHeader
        locale={locale}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("blog"), href: "/blog"},
          {label: post.title},
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
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mt-8 space-y-6">
          {post.category ? (
            <span className="inline-flex rounded-full bg-[#f0f0ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              {post.category.name}
            </span>
          ) : null}
          <div className="space-y-4">
            {metaLabel ? (
              <p className="text-sm uppercase tracking-[0.24em] text-ink/60">{metaLabel}</p>
            ) : null}
            {post.content ? (
              <div
                className="max-w-none space-y-4 text-base leading-8 text-ink/80 [&_a]:text-accent [&_a]:underline [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-ink [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:text-ink [&_li]:ms-5 [&_li]:list-disc [&_strong]:font-bold [&_strong]:text-ink"
                dangerouslySetInnerHTML={{__html: post.content}}
              />
            ) : (
              <p className="text-base leading-8 text-ink/80">{post.excerpt}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
