import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export function Logo({locale}: {locale: Locale}) {
  return (
    <Link
      href="/"
      locale={locale}
      className="flex items-center gap-2"
      aria-label="FGPOOL"
    >
      <img
        src="/yatay_logo.png"
        alt="FGPOOL"
        width={178}
        height={34}
        className="h-auto w-[8.9rem] sm:w-[10rem]"
      />
    </Link>
  );
}
