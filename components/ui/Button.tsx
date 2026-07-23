import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from "react";
import {cn} from "@/lib/utils";

const styles = {
  primary:
    "bg-accent text-white shadow-[0_10px_22px_rgba(232,72,58,0.26)] hover:bg-accent-dark",
  secondary:
    "border border-ink/15 bg-white/80 text-ink hover:border-primary/35 hover:bg-white",
  dark: "border border-white/18 bg-white/10 text-white hover:bg-white/16",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
  children: ReactNode;
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof styles;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AnchorButton({
  className,
  variant = "primary",
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
