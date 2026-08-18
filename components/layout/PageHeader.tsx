import {ChevronRight} from "lucide-react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {CrabSwimmer} from "./CrabSwimmer";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const CRABS = [
  {
    keyframe: "crab-walk-a",
    duration: "28s",
    delay: "-5s",
    bobDuration: "0.42s",
    bobDelay: "-0.1s",
    bottom: "0.15rem",
    size: "h-3.5 w-6 sm:h-4 sm:w-7",
    opacity: "opacity-90",
  },
  {
    keyframe: "crab-walk-b",
    duration: "34s",
    delay: "-17s",
    bobDuration: "0.5s",
    bobDelay: "-0.3s",
    bottom: "0.55rem",
    size: "h-3 w-5 sm:h-3.5 sm:w-6",
    opacity: "opacity-70",
  },
  {
    keyframe: "crab-walk-c",
    duration: "24s",
    delay: "-11s",
    bobDuration: "0.36s",
    bobDelay: "-0.2s",
    bottom: "0rem",
    size: "h-2.5 w-4 sm:h-3 sm:w-5",
    opacity: "opacity-80",
  },
];

export function PageHeader({
  locale,
  title,
  description,
  breadcrumbs,
  crabs = false,
}: {
  locale: Locale;
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  crabs?: boolean;
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

      <div
        dir="ltr"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden sm:h-14"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-slow text-[#9FDCF6]/70"
        >
          <path
            fill="currentColor"
            d="M0,44 C120,74 240,14 480,44 C600,74 720,14 960,44 C1080,74 1200,14 1440,44 C1560,74 1680,14 1920,44 C2040,74 2160,14 2400,44 C2520,74 2640,14 2880,44 L2880,120 L0,120 Z"
          />
        </svg>
        <svg
          viewBox="0 0 2880 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-fast text-[#1CA9E3]/55"
        >
          <path
            fill="currentColor"
            d="M0,58 C120,28 240,88 480,58 C600,28 720,88 960,58 C1080,28 1200,88 1440,58 C1560,28 1680,88 1920,58 C2040,28 2160,88 2400,58 C2520,28 2640,88 2880,58 L2880,120 L0,120 Z"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/18" />
      </div>

      {crabs ? (
        <div
          dir="ltr"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-5 overflow-hidden sm:h-6"
          aria-hidden="true"
        >
          {CRABS.map((crab, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                bottom: crab.bottom,
                left: 0,
                animationName: crab.keyframe,
                animationDuration: crab.duration,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationDelay: crab.delay,
              }}
            >
              <CrabSwimmer
                className={`text-[#FF6B4A] drop-shadow-[0_1px_1px_rgba(17,17,20,0.35)] ${crab.size} ${crab.opacity}`}
                style={{
                  animationName: "crab-step-bob",
                  animationDuration: crab.bobDuration,
                  animationTimingFunction: "steps(2, jump-none)",
                  animationIterationCount: "infinite",
                  animationDelay: crab.bobDelay,
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
