"use client";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {ProductCategory} from "@/lib/api/catalog";

export default function ClientMarquee({
  categories,
  locale,
  speed = 25,
}: {
  categories: ProductCategory[];
  locale: Locale;
  speed?: number; // pixels per second
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reqRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const posRef = useRef<number>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || categories.length === 0) return;
    const trackElement = track;

    let firstWidth = trackElement.scrollWidth / 2 || 0;

    function step(time: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!paused) {
        posRef.current -= speed * delta;
        if (Math.abs(posRef.current) >= firstWidth) {
          posRef.current += firstWidth;
        }
        trackElement.style.transform = `translateX(${posRef.current}px)`;
      }

      reqRef.current = requestAnimationFrame(step);
    }

    reqRef.current = requestAnimationFrame(step);

    function handleResize() {
      firstWidth = (trackElement.scrollWidth / 2) || 0;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [categories, paused, speed]);

  // duplicate for seamless loop
  const items = [...categories, ...categories];

  return (
    <div
      className="overflow-hidden px-5 sm:px-8 lg:px-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 will-change-transform"
        style={{transform: "translateX(0px)"}}
        aria-hidden={false}
      >
        {items.map((category, idx) => (
          <Link
            key={`${category.id}-${idx}`}
            href={`/products/${category.slug}`}
            locale={locale}
            className="group w-[78vw] max-w-[320px] shrink-0 cursor-pointer rounded-2xl border border-[#8e706f]/30 bg-[#fcf9f8] p-3 transition-all duration-300 sm:w-[320px] sm:rounded-3xl sm:p-4"
          >
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-[#f0eded] sm:h-28 sm:aspect-auto">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 320px, 78vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-1 text-base font-bold leading-snug text-ink sm:text-lg">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
