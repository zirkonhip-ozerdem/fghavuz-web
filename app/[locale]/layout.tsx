import type {Metadata} from "next";
import {Inter, Manrope} from "next/font/google";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {FabButton} from "@/components/layout/FabButton";
import {Footer} from "@/components/layout/Footer";
import {Header} from "@/components/layout/Header";
import {TopHeader} from "@/components/layout/TopHeader";
import {getFeaturedCategories} from "@/lib/api/catalog";
import {FALLBACK_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl, jsonLd} from "@/lib/api/seo";
import {FALLBACK_SITE_SETTINGS, getSiteSettings} from "@/lib/api/siteSettings";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "meta"});
  const siteSettings = await getSiteSettings(locale);
  const title = t("title");
  const favicon = siteSettings.favicon || "/favicon.png";
  const faviconType = favicon.endsWith(".svg") ? "image/svg+xml" : "image/png";
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  // Canonical/hreflang are set per page; defining them here would make every
  // page without its own alternates canonicalize to the homepage.
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteSettings.siteName || SITE_NAME}`,
    },
    description: t("description"),
    applicationName: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{url: favicon, type: faviconType}],
      shortcut: favicon,
      apple: favicon,
    },
    ...(googleVerification ? {verification: {google: googleVerification}} : {}),
    openGraph: {
      title,
      description: t("description"),
      type: "website",
      siteName: SITE_NAME,
      locale,
      images: [FALLBACK_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("description"),
      images: [FALLBACK_OG_IMAGE],
    },
  };
}

function isRealProfile(url: string | null): url is string {
  if (!url) return false;
  try {
    return new URL(url).pathname.replace(/\/$/, "") !== "";
  } catch {
    return false;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale: rawLocale} = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const [messages, siteSettings, categories] = await Promise.all([
    getMessages(),
    getSiteSettings(locale),
    getFeaturedCategories(locale),
  ]);
  const safeSiteSettings = siteSettings ?? FALLBACK_SITE_SETTINGS;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const usesApiSettings = safeSiteSettings !== FALLBACK_SITE_SETTINGS;
  const organizationLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: safeSiteSettings.siteName || SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl(safeSiteSettings.logo || "/assets/logo.png"),
        ...(usesApiSettings && safeSiteSettings.phone ? {telephone: safeSiteSettings.phone} : {}),
        ...(usesApiSettings && safeSiteSettings.email ? {email: safeSiteSettings.email} : {}),
        sameAs: Object.values(safeSiteSettings.social).filter(isRealProfile),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: safeSiteSettings.siteName || SITE_NAME,
        url: SITE_URL,
        inLanguage: locale,
        publisher: {"@id": `${SITE_URL}/#organization`},
      },
    ],
  };

  return (
    <html lang={locale} dir={dir} data-scroll-behavior="smooth" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationLd)} />
        <NextIntlClientProvider messages={messages}>
          <TopHeader locale={locale} siteSettings={safeSiteSettings} />
          <Header locale={locale} categories={categories} siteSettings={safeSiteSettings} />
          {children}
          <Footer locale={locale} siteSettings={safeSiteSettings} />
          <FabButton locale={locale} whatsappHref={safeSiteSettings.whatsappHref} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
