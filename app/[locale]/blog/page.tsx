import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-soft pt-36">
        <div className="absolute inset-x-0 top-0 h-36 bg-white" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_0.84fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              FGPOOL
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-normal text-ink sm:text-7xl">
              {t("blogTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
              {t("blogText")}
            </p>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-lg bg-ink">
            <Image
              src="/assets/hero-pool.jpeg"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-88"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:px-8 md:grid-cols-3">
          {[
            "Selecting overflow grating for hospitality pools",
            "Drainage capacity notes for aquatic centers",
            "Export packaging checklist for distributors",
          ].map((title) => (
            <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                Engineering
              </p>
              <h2 className="mt-4 text-xl font-black leading-tight text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">
                Practical guidance prepared for procurement and project teams.
              </p>
              <Link
                href="/blog"
                locale={locale}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                Read article
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
