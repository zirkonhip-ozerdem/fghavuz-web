import type {CSSProperties} from "react";

export function CrabSwimmer({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g className="crab-legs" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M20 26 L10 32" />
        <path d="M24 29 L16 36" />
        <path d="M40 26 L54 32" />
        <path d="M36 29 L48 36" />
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M16 18 L24 22" />
        <path d="M48 18 L40 22" />
      </g>
      <g fill="currentColor">
        <circle cx="10" cy="14" r="6" />
        <circle cx="54" cy="14" r="6" />
      </g>
      <ellipse cx="32" cy="24" rx="16" ry="11" fill="currentColor" />
      <circle cx="26" cy="18" r="2.2" fill="white" />
      <circle cx="38" cy="18" r="2.2" fill="white" />
      <circle cx="26" cy="18.4" r="1" fill="currentColor" />
      <circle cx="38" cy="18.4" r="1" fill="currentColor" />
    </svg>
  );
}
