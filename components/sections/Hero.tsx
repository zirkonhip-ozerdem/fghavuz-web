import {ArrowDownToLine, Droplets, Gauge} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {ProductCategory} from "@/lib/api/catalog";
import {HeroBackgroundSlider} from "./HeroBackgroundSlider";
import {ProductSearch} from "./ProductSearch";

export async function Hero({
  locale,
  categories,
}: {
  locale: Locale;
  categories: ProductCategory[];
}) {
  const t = await getTranslations("home");

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroBackgroundSlider />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,245,242,0.95)_0%,rgba(247,245,242,0.74)_44%,rgba(17,17,20,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(232,72,58,0.20),transparent_34%)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl gap-6 px-5 pb-10 pt-18 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-14 lg:pt-20">
        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(1.8rem,3.6vw,3rem)] font-black leading-[1.05] tracking-normal text-ink">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-xl text-[0.82rem] leading-5 text-ink/68 sm:text-[0.95rem]">
            {t("description")}
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              locale={locale}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-white shadow-[0_14px_28px_rgba(232,72,58,0.28)] transition hover:bg-accent-dark"
            >
              {t("quote")}
            </Link>
            <a
              href="#"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/12 bg-white/70 px-6 text-sm font-bold text-ink transition hover:border-primary/28 hover:bg-white"
            >
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              {t("download")}
            </a>
          </div>

          <div className="mt-9">
            <ProductSearch
              locale={locale}
              categories={categories}
              placeholder={t("search")}
              buttonLabel={t("searchButton")}
              suggestionsLabel={t("suggestions")}
            />
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block">
          <FeatureNote className="absolute end-6 top-4" icon={Gauge} title={t("heroCardOne")} text={t("heroCardOneText")} />
          <FeatureNote className="absolute bottom-4 start-12" icon={Droplets} title={t("heroCardTwo")} text={t("heroCardTwoText")} />
        </div>
      </div>
    </section>
  );
}

function FeatureNote({
  className,
  icon: Icon,
  title,
  text,
}: {
  className: string;
  icon: typeof Gauge;
  title: string;
  text: string;
}) {
  return (
    <div className={`${className} w-72 rounded-lg border border-white/52 bg-white/74 p-5 shadow-[0_20px_60px_rgba(17,17,20,0.16)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]`}>
      <span className="grid size-9 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-extrabold text-ink">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-ink/58">{text}</p>
    </div>
  );
}
