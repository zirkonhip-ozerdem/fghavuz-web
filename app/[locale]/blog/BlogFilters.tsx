"use client";

import {Search} from "lucide-react";

export function BlogFilters({
  items,
  placeholder,
  selected,
  onSelect,
  query,
  onQueryChange,
}: {
  items: readonly { id: string; label: string }[];
  placeholder: string;
  selected: string;
  onSelect: (id: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-pressed={selected === item.id}
            className={
              selected === item.id
                ? "rounded-full bg-accent px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition"
                : "rounded-full border border-ink/10 bg-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-neutral-soft hover:border-transparent"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-[18rem] lg:w-[18rem] lg:flex-shrink-0">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-ink/10 bg-white py-2.5 pl-12 pr-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>
    </div>
  );
}
