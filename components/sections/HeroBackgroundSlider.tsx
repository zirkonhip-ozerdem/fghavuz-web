"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";

const SLIDES = [
  {src: "/assets/hero-pool.jpeg", alt: ""},
  {src: "/assets/azure-project.jpeg", alt: ""},
  {src: "/assets/factory-floor.jpeg", alt: ""},
];

const SLIDE_DURATION_MS = 4000;

export function HeroBackgroundSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [activeIndex]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % SLIDES.length);
  };

  return (
    <>
      {SLIDES.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-5 end-5 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Önceki görsel"
          className="grid size-8 place-items-center rounded-full border border-white/50 bg-white/70 text-ink backdrop-blur-md transition hover:bg-white"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Sonraki görsel"
          className="grid size-8 place-items-center rounded-full border border-white/50 bg-white/70 text-ink backdrop-blur-md transition hover:bg-white"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
