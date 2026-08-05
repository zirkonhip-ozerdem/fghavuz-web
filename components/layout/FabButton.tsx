"use client";

import {MessageCircle, Smartphone, Store, X, Headset, BookOpen} from "lucide-react";
import {useState} from "react";
import type {Locale} from "@/i18n/routing";

const labels = {
  en: {
    open: "Open quick actions",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
    contact: "Contact & Support",
    catalog: "Catalog",
  },
  tr: {
    open: "Hızlı işlemleri aç",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
    contact: "İletişim ve Destek",
    catalog: "Katalog",
  },
  ar: {
    open: "فتح الإجراءات السريعة",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
    contact: "الاتصال والدعم",
    catalog: "فهرس",
  },
} satisfies Record<Locale, Record<string, string>>;

export function FabButton({locale}: {locale: Locale}) {
  const [open, setOpen] = useState(false);
  const isRtl = locale === "ar";
  const copy = labels[locale];

  const actions = [
    {
      label: copy.contact,
      href: `/${locale}/contact`,
      icon: Headset,
    },
    {
      label: copy.catalog,
      href: `/${locale}/catalog`,
      icon: BookOpen,
    },
    {
      label: copy.whatsapp,
      href: "https://wa.me/902120000000",
      icon: MessageCircle,
    },
    {
      label: copy.ios,
      href: "#",
      icon: Smartphone,
    },
    {
      label: copy.android,
      href: "#",
      icon: Store,
    },
  ];

  return (
    <div className={isRtl ? "fixed bottom-6 right-5 z-50" : "fixed bottom-6 left-5 z-50"}>
      <div
        className={
          open
            ? "mb-3 flex flex-col gap-2 opacity-100"
            : "pointer-events-none mb-3 flex translate-y-2 flex-col gap-2 opacity-0"
        }
      >
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="flex h-11 items-center gap-3 rounded-full border border-ink/10 bg-white px-3 pe-5 text-sm font-semibold text-ink shadow-[0_14px_36px_rgba(17,17,20,0.16)] transition hover:text-primary"
          >
            <span className="grid size-8 place-items-center rounded-full bg-neutral-soft text-accent">
              <action.icon className="size-4" aria-hidden="true" />
            </span>
            {action.label}
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid size-14 place-items-center rounded-full bg-accent text-white shadow-[0_16px_34px_rgba(232,72,58,0.36)] transition hover:bg-accent-dark"
        aria-label={copy.open}
        aria-expanded={open}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}