"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import type {Locale} from "@/i18n/routing";
import type {Project} from "@/lib/api/catalog";

const SPEED_PX_PER_SEC = 32;

export function ReferencesSlider({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reqRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const items = [...projects, ...projects];

  const getStep = (track: HTMLDivElement) => {
    const card = track.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return (card?.offsetWidth ?? track.clientWidth) + gap;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    function step(time: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (track && !isDraggingRef.current) {
        const halfWidth = track.scrollWidth / 2;
        track.scrollLeft += SPEED_PX_PER_SEC * delta;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }

      reqRef.current = requestAnimationFrame(step);
    }

    reqRef.current = requestAnimationFrame(step);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      lastTimeRef.current = null;
    };
  }, [projects]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;

    isPointerDownRef.current = true;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    track.scrollLeft = dragStartScrollLeftRef.current - (event.clientX - dragStartXRef.current);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
    trackRef.current?.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  const nudge = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep(track);
    isDraggingRef.current = true;
    track.scrollBy({left: direction === "next" ? step : -step, behavior: "smooth"});
    window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 550);
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => nudge("prev")}
          aria-label="Önceki proje"
          className="grid size-10 place-items-center rounded-full border border-ink/12 bg-white text-ink transition hover:border-accent/30 hover:text-accent"
        >
          <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => nudge("next")}
          aria-label="Sonraki proje"
          className="grid size-10 place-items-center rounded-full border border-ink/12 bg-white text-ink transition hover:border-accent/30 hover:text-accent"
        >
          <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </button>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDragStart={(event) => event.preventDefault()}
          className={`flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {items.map((project, index) => (
            <article
              key={`${project.id}-${index}`}
              data-card
              className="relative min-h-64 w-[46%] shrink-0 overflow-hidden rounded-3xl bg-[#132238] text-white shadow-[0_32px_64px_rgba(19,34,56,0.12)] sm:min-h-80 sm:w-[48%] lg:w-[31.5%]"
            >
              <Image
                src={project.image}
                alt={project.title[locale]}
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,20,0.08),rgba(17,17,20,0.78))]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/62">
                  {project.location[locale]}
                </p>
                <h3 className="mt-1 text-xl font-black">{project.title[locale]}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
