"use client";

import {Play, X} from "lucide-react";
import {useEffect, useState} from "react";
import type {VideoSource} from "@/lib/video";
import {VideoPlayer} from "./VideoPlayer";

export function VideoModalButton({source, label}: {source: VideoSource; label: string}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute bottom-7 end-7 grid size-14 place-items-center rounded-full border border-white/28 bg-white/16 text-white backdrop-blur transition hover:bg-white/24"
        aria-label={label}
        aria-haspopup="dialog"
      >
        <Play className="ms-1 size-5 fill-current" aria-hidden="true" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-lg bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <VideoPlayer source={source} title={label} className="h-full w-full" />
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-8 sm:top-8"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
