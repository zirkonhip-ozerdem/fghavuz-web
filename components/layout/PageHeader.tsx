import {ChevronRight} from "lucide-react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageHeader({
  locale,
  title,
  description,
  breadcrumbs,
}: {
  locale: Locale;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-36 text-white sm:pt-40">
      <Image
        src="/assets/page-header-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,20,0.82)_0%,rgba(17,17,20,0.62)_46%,rgba(17,17,20,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(28,169,227,0.28),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/62">
            {breadcrumbs.map((item, index) => {
              const current = index === breadcrumbs.length - 1;

              return (
                <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <ChevronRight className="size-3.5 text-white/38 rtl:rotate-180" aria-hidden="true" />
                  ) : null}
                  {item.href && !current ? (
                    <Link href={item.href} locale={locale} className="transition hover:text-accent">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={current ? "page" : undefined}>{item.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="mt-4 max-w-2xl text-2xl font-black leading-tight tracking-normal text-white sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">{description}</p>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden sm:h-14" aria-hidden="true">
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-[200%] animate-wave-slow text-[#9FDCF6]/70"
        >
          <path
            fill="currentColor"
            d="M0,44 C120,74 240,14 480,44 C600,74 720,14 960,44 C1080,74 1200,14 1440,44 C1560,74 1680,14 1920,44 C2040,74 2160,14 2400,44 C2520,74 2640,14 2880,44 L2880,120 L0,120 Z"
          />
        </svg>
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 h-full w-[200%] animate-wave-fast text-[#1CA9E3]/55"
        >
          <path
            fill="currentColor"
            d="M0,58 C120,28 240,88 480,58 C600,28 720,88 960,58 C1080,28 1200,88 1440,58 C1560,28 1680,88 1920,58 C2040,28 2160,88 2400,58 C2520,28 2640,88 2880,58 L2880,120 L0,120 Z"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/18" />
      </div>
    </section>
  );
}
