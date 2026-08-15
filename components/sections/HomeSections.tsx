import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import ClientMarquee from "./ClientMarquee";
import {ReferencesSlider} from "./ReferencesSlider";
import {RevealOnScroll} from "./RevealOnScroll";
import {VideoModalButton} from "./VideoModalButton";
import type {Locale} from "@/i18n/routing";
import type {Advantage, CatalogDocument, ProductCategory, Project} from "@/lib/api/catalog";
import type {BlogPost} from "@/lib/api/blog";
import type {VideoSource} from "@/lib/video";

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
          href="/products"
          locale={locale}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.12em] text-[#b52330] transition hover:text-[#410007]"
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

export async function CatalogShowcase({
  locale,
  documents,
}: {
  locale: Locale;
  documents: CatalogDocument[];
}) {
  const t = await getTranslations("home");
  const previewDocuments = documents.slice(0, 2);

  return (
    <section className="bg-[#fcf9f8] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#132238] p-8 text-white shadow-[0_32px_64px_rgba(19,34,56,0.18)] sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(37,99,235,0.25),transparent_38%),radial-gradient(circle_at_88%_86%,rgba(56,189,248,0.28),transparent_38%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">
                {t("catalogEyebrow")}
              </p>
              <h2 className="mt-3 text-4xl font-black leading-none tracking-normal sm:text-5xl">
                {t("catalogSectionTitle")}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/68">
                {t("catalogSectionText")}
              </p>
              <Link
                href="/catalog"
                locale={locale}
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold text-white transition"
                style={{background: "linear-gradient(90deg,#2563eb,#38bdf8)"}}
              >
                {t("catalogLink")}
                <ArrowRight className="ms-2 size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>

            <div className="min-w-0 grid grid-cols-1 gap-3">
              {previewDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent/40 hover:bg-white/10 sm:p-5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                    <FileText className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white sm:text-base">
                      {doc.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-white/56 sm:text-sm">
                      {doc.description}
                    </p>
                  </div>
                  <Link
                    href="/catalog"
                    locale={locale}
                    aria-label={t("catalogView")}
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-accent hover:text-accent"
                  >
                    <Download className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function FeaturedBlogSection({
  locale,
  posts,
}: {
  locale: Locale;
  posts: BlogPost[];
}) {
  const t = await getTranslations("home");
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="border-t border-[#8e706f]/20 bg-[#fcf9f8] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-normal text-ink sm:text-5xl md:text-5xl">
              {t("blogSectionTitle")}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink/58">
              {t("blogSectionText")}
            </p>
          </div>
          <Link
            href="/blog"
            locale={locale}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.12em] text-[#b52330] transition hover:text-[#410007]"
          >
            {t("blogSectionLink")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              locale={locale}
              className="group overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-none transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.22),0_16px_32px_rgba(37,99,235,0.12)] hover:[animation:card-sway_1.4s_ease-in-out_infinite]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 22vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#2563eb,#38bdf8)]" />
              </div>
              <div className="p-4">
                <span className="bg-[linear-gradient(90deg,#2563eb,#38bdf8)] bg-clip-text text-[0.58rem] font-black uppercase tracking-[0.16em] text-transparent">
                  {post.category?.name ?? ""}
                </span>
                <h3 className="mt-2 text-sm font-black leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-ink/56">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex items-center gap-3 text-[0.68rem] font-semibold text-ink/48">
                  {post.date ? (
                    <span>{dateFormatter.format(new Date(post.date))}</span>
                  ) : null}
                  {post.readTimeMinutes > 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3" aria-hidden="true" />
                      {post.readTimeMinutes} {t("blogMinutesShort")}
                    </span>
                  ) : null}
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
                  {t("blogReadMore")}
                  <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function FactoryBanner({videoSource}: {videoSource: VideoSource | null}) {
  const t = await getTranslations("home");
  const tSections = await getTranslations("sections");

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
          {videoSource ? (
            <VideoModalButton source={videoSource} label={tSections("corporateVideoLabel")} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export async function AdvantageSection({advantages}: {advantages: Advantage[]}) {
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
          {advantages.map((advantage, index) => {
            const Icon = advantageIcons[advantage.icon];

            return (
              <RevealOnScroll key={advantage.id} delayMs={index * 120}>
                <article className="group rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-[0_32px_64px_rgba(19,34,56,0.04)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(232,72,58,0.18),0_24px_48px_rgba(232,72,58,0.10)] hover:[animation:card-sway_1.4s_ease-in-out_infinite]">
                  <span className="grid size-10 place-items-center rounded-md bg-[rgba(255,90,95,0.1)] text-[#ff5a5f] transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-[#1b1c1c]">
                    {advantage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#1b1c1c]/70">
                    {advantage.description}
                  </p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function ReferencesSection({projects}: {projects: Project[]}) {
  const t = await getTranslations("home");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">
            {t("projectsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink/58">
            {t("projectsText")}
          </p>
          <p className="mt-3 text-sm font-bold text-blue-600">
            {t("statTitle")} · {t("statText")}
          </p>
        </div>

        <ReferencesSlider projects={projects} />
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
                {t("quote")}
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
