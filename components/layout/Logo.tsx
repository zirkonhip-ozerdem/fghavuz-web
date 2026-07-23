import {Waves} from "lucide-react";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export function Logo({locale, dark = false}: {locale: Locale; dark?: boolean}) {
  return (
    <Link
      href="/"
      locale={locale}
      className="flex items-center gap-2"
      aria-label="FGPOOL"
    >
      <span className="grid size-8 place-items-center rounded-full border border-primary/20 bg-white">
        <Waves className="size-4 text-primary" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span
          className={
            dark
              ? "block text-lg font-black tracking-normal text-white"
              : "block text-lg font-black tracking-normal text-primary"
          }
        >
          FGPOOL
        </span>
        <span
          className={
            dark
              ? "block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/54"
              : "block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-accent"
          }
        >
          Manufacturing
        </span>
      </span>
    </Link>
  );
}
