import {
  BookOpen,
  Boxes,
  CheckCircle2,
  Download,
  FileText,
  PencilRuler,
  Send,
} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import {Reveal} from "@/components/ui/Reveal";
import type {Locale} from "@/i18n/routing";
import {getCatalogDocuments} from "@/lib/api/catalog";

const formats = [
  {icon: FileText, title: "catalogFormatPdfTitle", text: "catalogFormatPdfText"},
  {icon: PencilRuler, title: "catalogFormatCadTitle", text: "catalogFormatCadText"},
  {icon: Boxes, title: "catalogFormatBimTitle", text: "catalogFormatBimText"},
] as const;

const steps = [
  {icon: BookOpen, title: "catalogStep1Title", text: "catalogStep1Text"},
  {icon: Send, title: "catalogStep2Title", text: "catalogStep2Text"},
  {icon: CheckCircle2, title: "catalogStep3Title", text: "catalogStep3Text"},
] as const;

export default async function CatalogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const documents = await getCatalogDocuments();

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-soft pt-28 sm:pt-36">
        <div className="absolute inset-x-0 top-0 h-28 bg-white sm:h-36" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-16 top-16 size-72 animate-pulse rounded-full bg-[#1CA9E3]/20 blur-3xl [animation-duration:5s]" />
          <div className="absolute -left-10 bottom-0 size-64 animate-pulse rounded-full bg-accent/14 blur-3xl [animation-delay:1.2s] [animation-duration:6s]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
          <Reveal>
            <h1 className="mt-4 max-w-2xl text-2xl font-black leading-tight tracking-normal text-ink sm:text-3xl">
              {t("catalogTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/62">
              {t("catalogText")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Documents grid */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black tracking-normal text-ink sm:text-4xl">
                {t("catalogGridTitle")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">{t("catalogGridText")}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, index) => (
              <Reveal key={doc.id} delay={index * 100}>
                <article className="flex h-full flex-col rounded-lg border border-ink/8 bg-neutral-soft p-6 transition hover:-translate-y-1 hover:border-primary/18 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
                  <FileText className="size-8 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{doc.title[locale]}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink/58">
                    {doc.description[locale]}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/40">
                      {t("catalogDocMeta", {format: doc.format, size: doc.size})}
                    </span>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-accent transition hover:text-accent-dark"
                    >
                      {t("catalogDownloadLabel")}
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-neutral-soft py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                {t("catalogFormatsEyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">
                {t("catalogFormatsTitle")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">{t("catalogFormatsText")}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-3">
            {formats.map(({icon: Icon, title, text}, index) => (
              <Reveal key={title} delay={index * 100}>
                <article className="rounded-lg border border-ink/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
                  <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{t(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/58">{t(text)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                {t("catalogProcessEyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-4xl">
                {t("catalogProcessTitle")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">{t("catalogProcessText")}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">
            {steps.map(({icon: Icon, title, text}, index) => (
              <Reveal key={title} delay={index * 100}>
                <article className="relative rounded-lg border border-ink/8 bg-neutral-soft p-6 transition hover:-translate-y-1 hover:border-primary/18 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
                  <span className="absolute end-6 top-6 text-4xl font-black text-ink/8">
                    0{index + 1}
                  </span>
                  <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-ink">{t(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/58">{t(text)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-soft pb-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-lg bg-ink px-6 py-14 text-center text-white shadow-[0_20px_60px_rgba(17,17,20,0.16)] sm:px-10 sm:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(232,72,58,0.32),transparent_32%),radial-gradient(circle_at_12%_88%,rgba(27,42,74,0.45),transparent_30%)]" />
            <Reveal className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-black leading-tight tracking-normal sm:text-4xl">
                {t("catalogCtaTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/72">
                {t("catalogCtaText")}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/quote"
                  locale={locale}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white transition hover:bg-accent-dark"
                >
                  {t("catalogCtaPrimary")}
                </Link>
                <Link
                  href="/contact"
                  locale={locale}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  {t("catalogCtaSecondary")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
