"use client";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {Product} from "@/lib/api/products";

export default function ClientMarquee({
  products,
  locale,
  speed = 25,
}: {
  products: Product[];
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
    if (!track || products.length === 0) return;
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
  }, [products, paused, speed]);

  // duplicate for seamless loop
  const items = [...products, ...products];

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
        {items.map((product, idx) => (
          <Link
            key={`${product.id}-${idx}`}
            href={`/products/${product.slug}`}
            locale={locale}
            className="group w-[78vw] max-w-[320px] shrink-0 cursor-pointer rounded-2xl border border-[#8e706f]/30 bg-[#fcf9f8] p-3 transition-all duration-300 sm:w-[320px] sm:rounded-3xl sm:p-4"
          >
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-[#f0eded] sm:h-28 sm:aspect-auto">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 320px, 78vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="font-semibold uppercase tracking-[0.18em] text-[#515f78] text-[0.65rem]">
              {product.series || "FGPOOL"}
            </span>
            <h3 className="mt-1 text-base font-bold leading-snug text-ink sm:text-lg">
              {product.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink/55">
              {product.short_description || product.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
