import {Mail, MapPin, Phone, Share2} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {Logo} from "./Logo";

export async function Footer({locale}: {locale: Locale}) {
  const t = await getTranslations();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Logo locale={locale} dark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">
            {t("footer.summary")}
          </p>
          <div className="mt-5 flex gap-2">
            {[Mail, Share2].map((Icon, index) => (
              <a
                key={index}
                href={index === 0 ? "mailto:sales@fgpool.com" : "#"}
                className="grid size-9 place-items-center rounded-full border border-white/12 text-white/68 transition hover:border-white/30 hover:text-white"
                aria-label={index === 0 ? "Email" : "Share"}
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn
          title={t("footer.company")}
          items={[
            [t("nav.corporate"), "/corporate"],
            [t("footer.factory"), "/corporate"],
            [t("footer.privacy"), "/privacy"],
            [t("footer.terms"), "/terms"],
          ]}
          locale={locale}
        />
        <FooterColumn
          title={t("nav.products")}
          items={[
            [t("nav.products"), "/products"],
            [t("nav.catalog"), "/catalog"],
            [t("footer.docs"), "/catalog"],
            [t("footer.portal"), "/quote"],
          ]}
          locale={locale}
        />

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/42">
            {t("footer.connect")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/62">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              6172 Sokak No: 14F İç Kapı No: 11 Bornova / İzmir
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              +90 (242) 555 01 23
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              sales@fgpool.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-xs text-white/46 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 FGPOOL. {t("footer.rights")}</p>
          <div className="flex gap-3 uppercase">
            {(["en", "tr", "ar"] as const).map((item) => (
              <Link key={item} href="/" locale={item} className="hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-5 text-center text-xs text-white/46 sm:px-8">
          <p>
            Bu bir{" "}
            <a
              href="https://yengecyazilim.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ff5722] transition hover:underline"
            >
              Yengeç Yazılım
            </a>{" "}
            ve{" "}
            <a
              href="https://yazilimnealaka.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0dafff] transition hover:underline"
            >
              YNA Ekibi
            </a>{" "}
            projesidir.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  locale,
}: {
  title: string;
  items: Array<[string, string]>;
  locale: Locale;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/42">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm text-white/62">
        {items.map(([label, href]) => (
          <li key={`${label}-${href}`}>
            <Link locale={locale} href={href} className="transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
