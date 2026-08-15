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
import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {PageHeader} from "@/components/layout/PageHeader";
import {VideoPlayer} from "@/components/sections/VideoPlayer";
import type {Locale} from "@/i18n/routing";
import {getCorporate} from "@/lib/api/corporate";
import {getSeoPage, toMetadata} from "@/lib/api/seo";
import {resolveVideoSource} from "@/lib/video";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const [seo, t] = await Promise.all([
    getSeoPage("corporate", locale),
    getTranslations({locale, namespace: "sections"}),
  ]);

  return toMetadata(seo, {title: t("corporateTitle"), description: t("corporateText")});
}

export default async function CorporatePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({locale, namespace: "sections"});
  const navT = await getTranslations({locale, namespace: "nav"});
  const corporate = await getCorporate(locale);
  const videoSource = resolveVideoSource(corporate.videoUrl, corporate.videoMedia);

  return (
    <main>
      <PageHeader
        locale={locale}
        title={corporate.title || t("corporateTitle")}
        description={corporate.subtitle || t("corporateText")}
        breadcrumbs={[
          {label: navT("home"), href: "/"},
          {label: navT("corporate")},
        ]}
      />

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
              src={corporate.image ?? "/assets/azure-project.jpeg"}
              alt={corporate.imageAlt || corporate.title}
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
              {corporate.description || t("corporateStoryText1")}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-ink/62">
              {corporate.storySections || t("corporateStoryText2")}
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

      {/* Video */}
      {videoSource ? (
        <section className="bg-neutral-soft py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="text-2xl font-black text-ink sm:text-3xl">
              {t("corporateVideoLabel")}
            </h2>
            <div className="relative mt-6 aspect-video overflow-hidden rounded-lg bg-ink shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
              <VideoPlayer
                source={videoSource}
                title={t("corporateVideoLabel")}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Mission & Vision */}
      <section className="bg-neutral-soft py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-2">
          <article className="rounded-lg border border-ink/8 bg-white p-8 transition hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
            <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-ink">{t("corporateMissionTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/62">
              {corporate.mission || t("corporateMissionText")}
            </p>
          </article>
          <article className="rounded-lg border border-ink/8 bg-white p-8 transition hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_18px_44px_rgba(17,17,20,0.10)]">
            <span className="grid size-10 place-items-center rounded-md bg-accent/10 text-accent">
              <Globe className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-black text-ink">{t("corporateVisionTitle")}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/62">
              {corporate.vision || t("corporateVisionText")}
            </p>
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

          {corporate.milestones.length > 0 ? (
            <ol className="mt-10 space-y-8 border-s-2 border-ink/10 ps-6 sm:mt-12 sm:space-y-10 sm:ps-8">
              {corporate.milestones.map((milestone, index) => (
                <li key={`${milestone.year}-${index}`} className="relative">
                  <span className="absolute -start-[2.05rem] top-0.5 grid size-6 place-items-center rounded-full bg-accent text-[0.62rem] font-black text-white sm:-start-[2.55rem]">
                    <span className="sr-only">{milestone.year}</span>
                  </span>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-ink">{milestone.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-ink/58">
                    {milestone.description}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
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
          )}
        </div>
      </section>
    </main>
  );
}
