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

    let firstWidth = track.scrollWidth / 2 || 0;

    function step(time: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!paused) {
        posRef.current -= speed * delta;
        if (Math.abs(posRef.current) >= firstWidth) {
          posRef.current += firstWidth;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }

      reqRef.current = requestAnimationFrame(step);
    }

    reqRef.current = requestAnimationFrame(step);

    function handleResize() {
      firstWidth = (track.scrollWidth / 2) || 0;
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
      className="-mx-5 px-5 overflow-hidden lg:mx-0 lg:px-0"
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
            className="group w-[340px] rounded-3xl border border-[#8e706f]/30 bg-[#fcf9f8] p-4 transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-28 overflow-hidden rounded-xl bg-[#f0eded] mb-4">
              <Image
                src={category.image}
                alt={category.name[locale]}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="font-semibold uppercase tracking-[0.18em] text-[#515f78] text-[0.65rem]">
              {category.kicker[locale]}
            </span>
            <h3 className="mt-1 text-body-lg font-bold text-ink">
              {category.name[locale]}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
