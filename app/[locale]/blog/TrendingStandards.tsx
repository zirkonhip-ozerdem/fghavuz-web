"use client";

import {useState} from "react";
import {ChevronDown} from "lucide-react";

type TrendingItem = {
  number: string;
  title: string;
  subtitle: string;
  details: string;
};

type TrendingStandardsProps = {
  title: string;
  items: readonly TrendingItem[];
};

export function TrendingStandards({title, items}: TrendingStandardsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white p-8 shadow-[0_12px_30px_rgba(17,17,20,0.08)]">
      <h3 className="mb-6 text-2xl font-black text-ink">{title}</h3>
      <div className="space-y-4">
        {items.map((item) => {
          const isOpen = openId === item.number;

          return (
            <div 
              key={item.number} 
              className="overflow-hidden rounded-xl border border-ink/10 bg-white transition hover:border-accent/30 hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.number)}
                aria-expanded={isOpen}
                className="group flex w-full items-start justify-between gap-4 p-4 text-left"
              >
                <div className="flex gap-3 items-start min-w-0">
                  <div className="text-sm font-black text-accent flex-shrink-0">{item.number}</div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm text-ink">{item.title}</h4>
                    <p className="mt-1 text-xs text-ink/60">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-ink/40 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen ? (
                <div className="border-t border-ink/10 bg-white px-4 pb-4 pt-3 text-xs leading-6 text-ink/70">
                  {item.details}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
