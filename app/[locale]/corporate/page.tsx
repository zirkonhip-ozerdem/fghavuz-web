import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe,
  Handshake,
  Lightbulb,
  Leaf,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";

const stats = [
  {icon: PackageCheck, title: "corporateStat1Title", text: "corporateStat1Text"},
  {icon: Globe, title: "corporateStat2Title", text: "corporateStat2Text"},
  {icon: ShieldCheck, title: "corporateStat3Title", text: "corporateStat3Text"},
] as const;

const values = [
  {icon: Award, title: "corporateValue1Title", text: "corporateValue1Text"},
  {icon: Lightbulb, title: "corporateValue2Title", text: "corporateValue2Text"},
  {icon: Leaf, title: "corporateValue3Title", text: "corporateValue3Text"},
  {icon: Handshake, title: "corporateValue4Title", text: "corporateValue4Text"},
] as const;

const milestones = [
  {year: "corporateMilestone1Year", title: "corporateMilestone1Title", text: "corporateMilestone1Text"},
  {year: "corporateMilestone2Year", title: "corporateMilestone2Title", text: "corporateMilestone2Text"},
  {year: "corporateMilestone3Year", title: "corporateMilestone3Title", text: "corporateMilestone3Text"},
  {year: "corporateMilestone4Year", title: "corporateMilestone4Title", text: "corporateMilestone4Text"},
] as const;

const certifications = [
  {label: "corporateCert1", text: "corporateCert1Text", href: "/certificates/iso-9001.pdf"},
  {label: "corporateCert2", text: "corporateCert2Text", href: "/certificates/ce.pdf"},
  {label: "corporateCert3", text: "corporateCert3Text", href: "/certificates/wras.pdf"},
  {label: "corporateCert4", text: "corporateCert4Text", href: "/certificates/reach.pdf"},
] as const;

export default async function CorporatePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-soft pt-28 sm:pt-36">
        <div className="absolute inset-x-0 top-0 h-28 bg-white sm:h-36" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-12 sm:gap-10 sm:px-8 sm:pb-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-normal text-ink sm:text-5xl">
              {t("corporateTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/62">
              {t("corporateText")}
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
            <video
              controls
              preload="metadata"
              poster="/assets/factory-floor.jpeg"
              aria-label={t("corporateVideoLabel")}
              className="absolute inset-0 size-full object-cover"
            >
              <source src="/assets/company-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 w-full overflow-hidden sm:h-16" aria-hidden="true">
          <svg
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-[200%] animate-wave-slow text-[#9FDCF6]"
          >
            <path
              fill="currentColor"
              d="M0,40 C90,70 180,10 360,40 C450,70 540,10 720,40 C810,70 900,10 1080,40 C1170,70 1260,10 1440,40 C1530,70 1620,10 1800,40 C1890,70 1980,10 2160,40 C2250,70 2340,10 2520,40 C2610,70 2700,10 2880,40 L2880,120 L0,120 Z"
            />
          </svg>
          <svg
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-full w-[200%] animate-wave-fast text-[#1CA9E3] opacity-90"
          >
            <path
              fill="currentColor"
              d="M0,55 C90,25 180,90 360,55 C450,25 540,90 720,55 C810,25 900,90 1080,55 C1170,25 1260,90 1440,55 C1530,25 1620,90 1800,55 C1890,25 1980,90 2160,55 C2250,25 2340,90 2520,55 C2610,25 2700,90 2880,55 L2880,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3">
          {stats.map(({icon: Icon, title, text}) => (
            <article
              key={title}
              className="rounded-lg border border-ink/8 bg-neutral-soft p-7 transition hover:-translate-y-1 hover:border-primary/18 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]"
            >
              <Icon className="size-8 text-accent" aria-hidden="true" />
              <h2 className="mt-6 text-3xl font-black text-ink">{t(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/58">{t(text)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-64 overflow-hidden rounded-lg bg-ink sm:min-h-80 lg:min-h-[460px]">
            <Image
              src="/assets/azure-project.jpeg"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              {t("corporateStoryEyebrow")}
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-normal text-ink sm:text-4xl">
              {t("corporateStoryTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-ink/62">
              {t("corporateStoryText1")}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/62">
              {t("corporateStoryText2")}
            </p>
            <ul className="mt-6 space-y-3">
              {["corporateStoryPoint1", "corporateStoryPoint2", "corporateStoryPoint3"].map(
                (key) => (
                  <li key={key} className="flex items-start gap-3 text-sm font-semibold text-ink">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {t(key)}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-soft py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-2">
          <article className="rounded-lg border border-ink/8 bg-white p-8 transition hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
            <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-ink">{t("corporateMissionTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/62">{t("corporateMissionText")}</p>
          </article>
          <article className="rounded-lg border border-ink/8 bg-white p-8 transition hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
            <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
              <Globe className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-ink">{t("corporateVisionTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/62">{t("corporateVisionText")}</p>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              {t("corporateValuesEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-5xl">
              {t("corporateValuesTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">{t("corporateValuesText")}</p>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({icon: Icon, title, text}) => (
              <article
                key={title}
                className="rounded-lg border border-ink/7 bg-neutral-soft p-6 shadow-[0_14px_38px_rgba(17,17,20,0.05)] transition hover:-translate-y-1 hover:border-primary/18 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]"
              >
                <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-ink">{t(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/58">{t(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing capability */}
      <section className="bg-neutral-soft py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                {t("corporateFactoryEyebrow")}
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-black tracking-normal text-ink sm:text-5xl">
                {t("corporateFactoryTitle")}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-ink/62">
                {t("corporateFactoryText")}
              </p>
            </div>
            <div className="rounded-lg border border-ink/8 bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
              <ul className="space-y-5">
                {["corporateFactoryPoint1", "corporateFactoryPoint2", "corporateFactoryPoint3"].map(
                  (key) => (
                    <li key={key} className="flex items-start gap-3 text-sm font-semibold text-ink">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {t(key)}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/8 pt-6">
                {certifications.map(({label, text, href}) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t(text)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-neutral-soft px-3 py-1.5 text-xs font-bold text-ink transition hover:border-accent/30 hover:bg-white hover:text-accent"
                  >
                    <BadgeCheck className="size-3.5 text-accent" aria-hidden="true" />
                    {t(label)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              {t("corporateTimelineEyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-ink sm:text-5xl">
              {t("corporateTimelineTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink/58">{t("corporateTimelineText")}</p>
          </div>

          <ol className="mt-10 space-y-8 border-s-2 border-ink/10 ps-6 sm:mt-12 sm:space-y-10 sm:ps-8">
            {milestones.map(({year, title, text}) => (
              <li key={year} className="relative">
                <span className="absolute -start-[2.05rem] top-0.5 grid size-6 place-items-center rounded-full bg-accent text-[0.62rem] font-black text-white sm:-start-[2.55rem]">
                  <span className="sr-only">{t(year)}</span>
                </span>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                  {t(year)}
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-ink">{t(title)}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-ink/58">{t(text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
