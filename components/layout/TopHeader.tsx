import {Mail, MapPin, MessageCircle, Phone} from "lucide-react";
import {getTranslations} from "next-intl/server";
import type {Locale} from "@/i18n/routing";
import {CONTACT} from "@/lib/contact";

function InstagramIcon({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const linkClassName = "grid size-6 place-items-center text-ink/80 transition hover:text-[#F4B96A]";

export async function TopHeader({locale}: {locale: Locale}) {
  const t = await getTranslations("topbar");

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 bg-[#c9ebf3]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-2 ms-1 sm:gap-4 sm:ms-6">
          <a href={CONTACT.phoneHref} aria-label={t("phone")} className={linkClassName}>
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <a href={CONTACT.emailHref} aria-label={t("email")} className={linkClassName}>
            <Mail className="size-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
            className={linkClassName}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("location")}
            className={linkClassName}
          >
            <MapPin className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden sm:overflow-visible">
          <p
            key={locale}
            className="inline-block whitespace-nowrap text-[11px] font-bold text-ink/80 [animation:topbar-marquee_12s_linear_infinite] sm:block sm:w-full sm:animate-none sm:truncate sm:text-center sm:text-sm"
          >
            {t("welcome")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href={CONTACT.instagramHref} aria-label={t("instagram")} className={linkClassName}>
            <InstagramIcon className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
