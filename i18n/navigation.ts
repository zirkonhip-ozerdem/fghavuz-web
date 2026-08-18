import {createElement, type AnchorHTMLAttributes} from "react";
import NextLink, {type LinkProps as NextLinkProps} from "next/link";
import {routing, type Locale} from "./routing";

type LocalizedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<NextLinkProps, "href" | "locale"> & {
    href: string;
    locale: Locale;
  };

const locales = routing.locales;

function splitHref(href: string) {
  const [pathnameWithSearch, hash = ""] = href.split("#");
  const [pathname = "", search = ""] = pathnameWithSearch.split("?");

  return {
    pathname: pathname || "/",
    search: search ? `?${search}` : "",
    hash: hash ? `#${hash}` : "",
  };
}

function stripLocalePrefix(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) {
      return "/";
    }

    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }

  return pathname;
}

function translateInternalPathname(pathname: string, locale: Locale) {
  const normalizedPathname = stripLocalePrefix(pathname);
  const segments = normalizedPathname.split("/").filter(Boolean);
  const productsPath = locale === "tr" ? "urunlerimiz" : "products";
  const productPath = locale === "tr" ? "urun" : "product";

  if (normalizedPathname === "/") return `/${locale}`;
  if (normalizedPathname === "/corporate") {
    return `/${locale}/${locale === "tr" ? "kurumsal" : "corporate"}`;
  }
  if (normalizedPathname === "/catalog") {
    return `/${locale}/${locale === "tr" ? "katalog" : "catalog"}`;
  }
  if (normalizedPathname === "/contact") {
    return `/${locale}/${locale === "tr" ? "iletisim" : "contact"}`;
  }
  if (normalizedPathname === "/quote") {
    return `/${locale}/${locale === "tr" ? "teklif-al" : "quote"}`;
  }
  if (segments[0] === "legal" && segments[1]) {
    return `/${locale}/${locale === "tr" ? "yasal" : "legal"}/${segments.slice(1).join("/")}`;
  }
  if (segments[0] === "products") {
    if (segments.length === 1) return `/${locale}/${productsPath}`;
    if (segments[1] === "category" && segments[2]) {
      return `/${locale}/${productsPath}/${segments.slice(2).join("/")}`;
    }
    if (segments[1] === "detail" && segments[2]) {
      return `/${locale}/${productPath}/${segments.slice(2).join("/")}`;
    }

    return `/${locale}/${productPath}/${segments.slice(1).join("/")}`;
  }

  return `/${locale}${normalizedPathname.startsWith("/") ? normalizedPathname : `/${normalizedPathname}`}`;
}

export function getLocalizedHref(href: string, locale: Locale) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const {pathname, search, hash} = splitHref(href.startsWith("/") ? href : `/${href}`);
  return `${translateInternalPathname(pathname, locale)}${search}${hash}`;
}

export function Link({href, locale, ...props}: LocalizedLinkProps) {
  return createElement(NextLink, {
    ...props,
    href: getLocalizedHref(href, locale),
  });
}
