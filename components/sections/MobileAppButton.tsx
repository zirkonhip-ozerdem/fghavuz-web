"use client";

import {ArrowDownToLine, Smartphone, X} from "lucide-react";
import {useEffect, useState} from "react";

export function MobileAppButton({
  label,
  title,
  text,
  closeLabel,
}: {
  label: string;
  title: string;
  text: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/12 bg-white/70 px-6 text-sm font-bold text-ink transition hover:border-primary/28 hover:bg-white"
      >
        <ArrowDownToLine className="size-4" aria-hidden="true" />
        {label}
      </button>

      <div
        className={`fixed inset-0 z-[80] grid place-items-center bg-ink/45 px-5 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-app-dialog-title"
          className={`w-full max-w-md rounded-lg border border-white/50 bg-white p-6 text-ink shadow-[0_28px_80px_rgba(17,17,20,0.24)] transition duration-200 ${
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
              <Smartphone className="size-5" aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-9 shrink-0 place-items-center rounded-full text-ink/62 transition hover:bg-neutral-soft hover:text-ink"
              aria-label={closeLabel}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <h2 id="mobile-app-dialog-title" className="mt-5 text-2xl font-black leading-tight text-ink">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink/62">{text}</p>
        </div>
      </div>
    </>
  );
}
