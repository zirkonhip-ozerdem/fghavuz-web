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
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, `/${item}`]),
  );

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://fgpool.example"),
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
      images: ["/assets/hero-pool.jpeg"],
    },
  };
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
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <TopHeader locale={locale} />
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
          <FabButton locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
