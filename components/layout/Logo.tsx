import Image from "next/image";
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
      <span
        className={
          dark
            ? "rounded-sm bg-white px-2 py-1"
            : "rounded-sm bg-transparent"
        }
      >
        <Image
          src="/assets/logo.png"
          alt="FGPOOL"
          width={178}
          height={34}
          priority
          className="h-auto w-[8.9rem] sm:w-[10rem]"
        />
      </span>
    </Link>
  );
}
