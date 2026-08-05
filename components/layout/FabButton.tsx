"use client";

import {MessageCircle, Smartphone, Store, X, Headset, BookOpen} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {Locale} from "@/i18n/routing";
import {launchWaterDrops} from "@/lib/confetti";

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
  const hasCelebratedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRtl = locale === "ar";
  const copy = labels[locale];

  const handleToggle = () => {
    setOpen((value) => {
      const next = !value;
      if (next && !hasCelebratedRef.current) {
        hasCelebratedRef.current = true;
        launchWaterDrops();
      }
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

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
    <div
      ref={containerRef}
      className={isRtl ? "fixed bottom-6 right-5 z-50" : "fixed bottom-6 left-5 z-50"}
    >
      <div className="mb-3 flex flex-col gap-2">
        {actions.map((action, index) => {
          const openDelay = (actions.length - 1 - index) * 45;

          return (
            <a
              key={action.label}
              href={action.href}
              tabIndex={open ? 0 : -1}
              style={{transitionDelay: open ? `${openDelay}ms` : "0ms"}}
              className={
                "flex h-11 items-center gap-3 rounded-full border border-ink/10 bg-white px-3 pe-5 text-sm font-semibold text-ink shadow-[0_14px_36px_rgba(17,17,20,0.16)] transition-all duration-300 ease-out hover:text-primary " +
                (open
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-3 scale-90 opacity-0")
              }
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-soft text-accent">
                <action.icon className="size-4" aria-hidden="true" />
              </span>
              {action.label}
            </a>
          );
        })}
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className={
          "relative grid size-14 place-items-center rounded-full bg-accent text-white shadow-[0_16px_34px_rgba(232,72,58,0.36)] transition-transform duration-300 ease-out hover:bg-accent-dark active:scale-90 " +
          (open ? "scale-105" : "scale-100")
        }
        aria-label={copy.open}
        aria-expanded={open}
      >
        <X
          className={
            "absolute size-5 transition-all duration-300 ease-out " +
            (open ? "rotate-0 scale-100 opacity-100" : "rotate-45 scale-50 opacity-0")
          }
          aria-hidden="true"
        />
        <MessageCircle
          className={
            "absolute size-5 transition-all duration-300 ease-out " +
            (open ? "-rotate-45 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100")
          }
          aria-hidden="true"
        />
      </button>
    </div>
  );
}