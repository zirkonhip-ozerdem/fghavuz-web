"use client";

import {Search} from "lucide-react";
import {BlogFilterButton} from "./BlogFilterButton";

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
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-ink/10 bg-white py-2.5 pl-12 pr-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-2xl bg-neutral-soft p-1.5">
        {items.map((item) => (
          <BlogFilterButton
            key={item.id}
            label={item.label}
            active={selected === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
