import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export function Logo({locale}: {locale: Locale}) {
  return (
    <Link
      href="/"
      locale={locale}
      className="flex items-center gap-3 font-extrabold tracking-tight text-primary"
      aria-label="FGPOOL"
    >
      <img
        src="/assets/logo.png"
        alt="FGPOOL Logo"
        className="h-8 md:h-10 w-auto"
      />
    </Link>
  );
}
