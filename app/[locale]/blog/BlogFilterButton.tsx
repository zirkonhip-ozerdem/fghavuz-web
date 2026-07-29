"use client";

export function BlogFilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-xl bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-sm transition"
          : "rounded-xl px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/55 transition hover:text-ink"
      }
    >
      {label}
    </button>
  );
}
