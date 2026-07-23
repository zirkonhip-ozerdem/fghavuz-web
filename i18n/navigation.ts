import {createElement, type AnchorHTMLAttributes} from "react";
import NextLink, {type LinkProps as NextLinkProps} from "next/link";
import type {Locale} from "./routing";

type LocalizedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<NextLinkProps, "href" | "locale"> & {
    href: string;
    locale: Locale;
  };

function localizeHref(href: string, locale: Locale) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  if (href.startsWith(`/${locale}/`) || href === `/${locale}`) {
    return href;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function Link({href, locale, ...props}: LocalizedLinkProps) {
  return createElement(NextLink, {
    ...props,
    href: localizeHref(href, locale),
  });
}
