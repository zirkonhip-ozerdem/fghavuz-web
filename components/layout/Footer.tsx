import {Mail, MapPin, Phone, Share2} from "lucide-react";
import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import {getFeaturedCategories} from "@/lib/api/catalog";
import type {SiteSettings} from "@/lib/api/siteSettings";
import {legalDocuments} from "@/lib/data/legal";
import {FooterProductsColumn} from "./FooterProductsColumn";
import {Logo} from "./Logo";

const pageLinks = [
  {key: "home", href: "/"},
  {key: "corporate", href: "/corporate"},
  {key: "products", href: "/products"},
  {key: "catalog", href: "/catalog"},
  {key: "blog", href: "/blog"},
  {key: "contact", href: "/contact"},
] as const;

const YENGEC_YAZILIM_URL = "https://yengecyazilim.com/";
const YNA_EKIBI_URL = "https://yazilimnealaka.com.tr/";

export async function Footer({
  locale,
  siteSettings,
}: {
  locale: Locale;
  siteSettings: SiteSettings;
}) {
  const t = await getTranslations();
  const categories = await getFeaturedCategories(locale);

  return (
    <footer id="site-footer" className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo locale={locale} />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">
            {siteSettings.footerText || t("footer.summary")}
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={siteSettings.emailHref}
              className="grid size-9 place-items-center rounded-full border border-white/12 text-white/68 transition hover:border-white/30 hover:text-white"
              aria-label="Email"
            >
              <Mail className="size-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              locale={locale}
              className="grid size-9 place-items-center rounded-full border border-white/12 text-white/68 transition hover:border-white/30 hover:text-white"
              aria-label="Share"
            >
              <Share2 className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <FooterColumn
          title={t("footer.pagesTitle")}
          items={pageLinks.map((item) => [t(`nav.${item.key}`), item.href] as [string, string])}
          locale={locale}
          className="lg:translate-x-10"
        />
        <FooterProductsColumn
          title={t("nav.products")}
          items={categories.map(
            (category) => [category.name[locale], `/products/category/${category.slug}`] as [string, string]
          )}
          locale={locale}
        />
        <FooterColumn
          title={t("footer.legalTitle")}
          items={legalDocuments.map(
            (document) => [document.title[locale], `/legal/${document.slug}`] as [string, string]
          )}
          locale={locale}
        />

        <div className="lg:translate-x-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/42">
            {t("nav.contact")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-white/62">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              {siteSettings.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={siteSettings.phoneHref} className="transition hover:text-white">
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={siteSettings.emailHref} className="transition hover:text-white">
                {siteSettings.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 overflow-hidden rounded-md border border-white/12">
            <iframe
              src={
                siteSettings.mapEmbedUrl ??
                `https://www.google.com/maps?q=${encodeURIComponent(siteSettings.address)}&output=embed`
              }
              title="FGPOOL konum haritası"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-20 w-full border-0 grayscale invert-[.92] contrast-[.85]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-5 py-5 text-center text-xs text-white/46 sm:grid-cols-[1fr_auto_1fr] sm:px-8 sm:text-left">
          <p>{siteSettings.copyrightText || `© 2026 FGPOOL. ${t("footer.rights")}`}</p>
          <p className="text-center text-[0.68rem] leading-5">
            Bu bir{" "}
            <a
              href={siteSettings.yengecYazilimUrl || YENGEC_YAZILIM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#ff5722] transition hover:underline"
            >
              Yengeç Yazılım
            </a>{" "}
            ve{" "}
            <a
              href={siteSettings.ynaEkibiUrl || YNA_EKIBI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0dafff] transition hover:underline"
            >
              YNA Ekibi
            </a>{" "}
            projesidir.
          </p>
          <div className="flex justify-center gap-3 uppercase sm:justify-end">
            {(["en", "tr", "ar"] as const).map((item) => (
              <Link key={item} href="/" locale={item} className="hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  locale,
  className,
}: {
  title: string;
  items: Array<[string, string]>;
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={className}>
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
