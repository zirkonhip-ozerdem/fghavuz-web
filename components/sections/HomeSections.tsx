import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Factory,
  Play,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import ClientMarquee from "./ClientMarquee";
import type {Locale} from "@/i18n/routing";
import type {Advantage, ProductCategory, Project} from "@/lib/api/catalog";

const advantageIcons = {
  award: Award,
  truck: Truck,
  shield: ShieldCheck,
};

export async function EngineeredComponents({
  locale,
  categories,
}: {
  locale: Locale;
  categories: ProductCategory[];
}) {
  const t = await getTranslations("home");

  return (
    <section className="bg-[#fcf9f8] border-t border-[#8e706f]/30 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8 mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-normal text-ink sm:text-5xl md:text-5xl">
            {t("componentsTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/58">
            {t("componentsText")}
          </p>
        </div>
        <Link
          href="/catalog"
          locale={locale}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#b52330] transition hover:text-[#410007]"
        >
          {t("catalogLink")}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative w-full overflow-hidden bg-[#f0eded] py-8">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#fcf9f8] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#fcf9f8] to-transparent z-10 pointer-events-none" />
        <div className="relative">
          <ClientMarquee categories={categories} locale={locale} />
        </div>
      </div>
    </section>
  );
}

export async function FactoryBanner() {
  const t = await getTranslations("home");

  return (
    <section className="bg-[#fcf9f8] py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative min-h-[430px] overflow-hidden rounded-2xl bg-[#132238] p-6 text-white shadow-[0_32px_64px_rgba(19,34,56,0.04)] sm:p-10">
          <Image
            src="/assets/factory-floor.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-74"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,20,0.84),rgba(17,17,20,0.28))]" />
          <div className="relative flex min-h-[350px] max-w-xl flex-col justify-end">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              {t("factoryEyebrow")}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-normal sm:text-5xl">
              {t("factoryTitle")}
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/72">{t("factoryText")}</p>
          </div>
          <button
            type="button"
            className="absolute bottom-7 end-7 grid size-14 place-items-center rounded-full border border-white/28 bg-white/16 text-white backdrop-blur transition hover:bg-white/24"
            aria-label="Play"
          >
            <Play className="ms-1 size-5 fill-current" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export async function AdvantageSection({
  locale,
  advantages,
}: {
  locale: Locale;
  advantages: Advantage[];
}) {
  const t = await getTranslations("home");

  return (
    <section className="bg-[#fcf9f8] py-20">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <h2 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">
          {t("advantageTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink/56">
          {t("advantageText")}
        </p>
        <div className="mt-10 grid gap-5 text-start md:grid-cols-3">
          {advantages.map((advantage) => {
            const Icon = advantageIcons[advantage.icon];

            return (
              <article
                key={advantage.id}
                className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_32px_64px_rgba(19,34,56,0.04)]"
              >
                <span className="grid size-10 place-items-center rounded-md bg-[rgba(255,90,95,0.1)] text-[#ff5a5f]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#1b1c1c]">
                  {advantage.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#1b1c1c]/70">
                  {advantage.description[locale]}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function ProjectGallery({
  locale,
  projects,
}: {
  locale: Locale;
  projects: Project[];
}) {
  const t = await getTranslations("home");
  const [featured, secondary] = projects;

  return (
    <section className="bg-[#fcf9f8] pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center text-4xl font-black tracking-normal text-ink sm:text-5xl">
          {t("projectsTitle")}
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.55fr_0.75fr]">
          <ProjectCard project={featured} locale={locale} large />
          <div className="grid gap-5">
            <ProjectCard project={secondary} locale={locale} />
            <div className="grid min-h-56 place-items-center rounded-3xl bg-accent p-8 text-center text-ink">
              <div>
                <Building2 className="mx-auto size-9" aria-hidden="true" />
                <h3 className="mt-5 text-3xl font-black">{t("statTitle")}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/68">{t("statText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function CtaBanner({locale}: {locale: Locale}) {
  const t = await getTranslations("home");

  return (
    <section className="bg-[#fcf9f8] pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#132238] px-6 py-16 text-center text-white shadow-[0_32px_64px_rgba(19,34,56,0.04)] sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(232,72,58,0.32),transparent_32%),radial-gradient(circle_at_12%_88%,rgba(27,42,74,0.45),transparent_30%)]" />
          <div className="relative mx-auto max-w-3xl">
            <CheckCircle2 className="mx-auto mb-5 size-8 text-accent" aria-hidden="true" />
            <h2 className="text-4xl font-black leading-none tracking-normal sm:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/72">
              {t("ctaText")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/quote"
                locale={locale}
                className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold text-white transition"
                style={{background: 'linear-gradient(90deg,#ff5a5f,#ffa552)'}}
              >
                {t("dealer")}
              </Link>
              <Link
                href="/contact"
                locale={locale}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {t("sales")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  large = false,
}: {
  project: Project;
  locale: Locale;
  large?: boolean;
}) {
  return (
    <article
      className={
        large
          ? "relative min-h-[460px] overflow-hidden rounded-3xl bg-[#132238] text-white shadow-[0_32px_64px_rgba(19,34,56,0.04)]"
          : "relative min-h-56 overflow-hidden rounded-3xl bg-[#132238] text-white shadow-[0_24px_48px_rgba(19,34,56,0.03)]"
      }
    >
      <Image
        src={project.image}
        alt={project.title[locale]}
        fill
        sizes={large ? "(min-width: 1024px) 65vw, 100vw" : "(min-width: 1024px) 35vw, 100vw"}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,20,0.08),rgba(17,17,20,0.72))]" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/62">
          {project.location[locale]}
        </p>
        <h3 className="mt-1 text-xl font-black">{project.title[locale]}</h3>
      </div>
    </article>
  );
}
