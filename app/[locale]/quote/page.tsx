import Image from "next/image";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

export default async function QuotePage({
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
              {t("quoteTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
              {t("quoteText")}
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
        <form className="mx-auto grid max-w-4xl gap-5 px-5 sm:px-8 md:grid-cols-2">
          {["Company", "Email", "Product / category", "Estimated quantity"].map((label) => (
            <label key={label} className="text-sm font-bold text-ink">
              {label}
              <input
                className="mt-2 h-12 w-full rounded-md border border-ink/12 bg-neutral-soft px-4 font-medium outline-none transition focus:border-primary"
                placeholder={label}
              />
            </label>
          ))}
          <label className="text-sm font-bold text-ink md:col-span-2">
            Project notes
            <textarea
              className="mt-2 min-h-32 w-full rounded-md border border-ink/12 bg-neutral-soft px-4 py-3 font-medium outline-none transition focus:border-primary"
              placeholder="Pool type, country, target delivery date"
            />
          </label>
          <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 text-sm font-bold text-white md:w-fit">
            Send request
          </button>
        </form>
      </section>
    </main>
  );
}
