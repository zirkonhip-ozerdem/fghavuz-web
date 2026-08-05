"use client";

import {MessageCircle, Smartphone, Store, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {Locale} from "@/i18n/routing";
import {launchWaterDrops} from "@/lib/confetti";

const labels = {
  en: {
    open: "Open quick actions",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
  },
  tr: {
    open: "Hızlı işlemleri aç",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
  },
  ar: {
    open: "فتح الإجراءات السريعة",
    whatsapp: "WhatsApp",
    ios: "App Store",
    android: "Google Play",
  },
} satisfies Record<Locale, Record<string, string>>;

export function FabButton({locale}: {locale: Locale}) {
  const [open, setOpen] = useState(false);
  const [liftPx, setLiftPx] = useState(0);
  const hasCelebratedRef = useRef(false);
  const isRtl = locale === "ar";
  const copy = labels[locale];

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const updateLift = () => {
      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      setLiftPx(overlap > 0 ? overlap : 0);
    };

    updateLift();
    window.addEventListener("scroll", updateLift, {passive: true});
    window.addEventListener("resize", updateLift);
    return () => {
      window.removeEventListener("scroll", updateLift);
      window.removeEventListener("resize", updateLift);
    };
  }, []);

  const actions = [
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

  function handleToggle() {
    setOpen((value) => {
      const next = !value;

      if (next && !hasCelebratedRef.current) {
        hasCelebratedRef.current = true;
        launchWaterDrops();
      }

      return next;
    });
  }

  return (
    <div
      className={isRtl ? "fixed right-5 z-50" : "fixed left-5 z-50"}
      style={{bottom: `${24 + liftPx}px`}}
    >
      <div className={`mb-3 flex flex-col gap-2 transition-all duration-300 ease-out ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            className={`flex h-11 origin-bottom items-center gap-3 rounded-full border border-ink/10 bg-white px-3 pe-5 text-sm font-semibold text-ink shadow-[0_14px_36px_rgba(17,17,20,0.16)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-primary ${
              open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
            }`}
            style={{transitionDelay: open ? `${index * 55}ms` : `${(actions.length - index - 1) * 35}ms`}}
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
        onClick={handleToggle}
        className={`grid size-14 place-items-center rounded-full bg-accent text-white shadow-[0_16px_34px_rgba(232,72,58,0.36)] transition-all duration-300 hover:bg-accent-dark ${
          open ? "rotate-90 scale-105" : "rotate-0 scale-100"
        }`}
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
