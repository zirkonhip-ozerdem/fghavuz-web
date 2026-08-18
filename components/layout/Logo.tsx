import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

export function Logo({
  locale,
  logoUrl,
  siteName,
}: {
  locale: Locale;
  logoUrl?: string | null;
  siteName?: string | null;
}) {
  return (
    <Link
      href="/"
      locale={locale}
      className="flex items-center gap-3 font-extrabold tracking-tight text-primary"
      aria-label={siteName || "FGPOOL"}
    >
      <img
        src={logoUrl || "/assets/logo.png"}
        alt={siteName ? `${siteName} Logo` : "FGPOOL Logo"}
        className="h-8 md:h-10 w-auto"
      />
    </Link>
  );
}
