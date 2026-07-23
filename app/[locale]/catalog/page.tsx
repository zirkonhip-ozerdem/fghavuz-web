import {ArrowRight, Download} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export default async function CatalogPage({
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
              {t("catalogTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
              {t("catalogText")}
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
        <div className="mx-auto grid max-w-5xl gap-5 px-5 sm:px-8 md:grid-cols-2">
          {["Complete Product Catalog", "Technical Drainage Sheets"].map((title) => (
            <article key={title} className="rounded-lg border border-ink/8 bg-neutral-soft p-7">
              <Download className="size-8 text-accent" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-black text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">
                PDF preview and download placeholder for the future Laravel media API.
              </p>
              <Link
                href="/quote"
                locale={locale}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent"
              >
                Request catalog
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
