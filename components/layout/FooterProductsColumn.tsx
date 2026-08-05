"use client";

import {MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

const VISIBLE_LIMIT = 5;

export function FooterProductsColumn({
  title,
  items,
  locale,
  className,
}: {
  title: string;
  items: Array<[string, string]>;
  locale: Locale;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > VISIBLE_LIMIT;
  const visibleItems = expanded || !hasMore ? items : items.slice(0, VISIBLE_LIMIT);

  return (
    <div className={className}>
      <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/42">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm text-white/62">
        {visibleItems.map(([label, href]) => (
          <li key={`${label}-${href}`}>
            <Link locale={locale} href={href} className="transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
        {hasMore && !expanded && (
          <li>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label="Tümünü göster"
              className="flex size-6 items-center justify-center rounded-full border border-white/12 text-white/62 transition hover:border-white/30 hover:text-white"
            >
              <MoreHorizontal className="size-4" aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
